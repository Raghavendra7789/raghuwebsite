import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Plus, Sparkles, Brain, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface DataPoint {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
  label: 1 | -1; // 1 = Cyan, -1 = Violet
}

export function NeuralPlayground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedClass, setSelectedClass] = useState<1 | -1>(1);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [epochs, setEpochs] = useState<number>(50);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [weights, setWeights] = useState<{ w1: number; w2: number; bias: number }>({
    w1: 0.6,
    w2: -0.7,
    bias: 0.05,
  });
  const [epochCount, setEpochCount] = useState<number>(0);

  // Initial balanced sample dataset
  const [points, setPoints] = useState<DataPoint[]>([
    // Class 1 (Cyan) top-right cluster
    { x: 0.35, y: 0.45, label: 1 },
    { x: 0.65, y: 0.6, label: 1 },
    { x: 0.2, y: 0.75, label: 1 },
    { x: 0.5, y: 0.3, label: 1 },
    { x: 0.75, y: 0.25, label: 1 },
    { x: 0.4, y: 0.8, label: 1 },
    // Class -1 (Violet) bottom-left cluster
    { x: -0.4, y: -0.3, label: -1 },
    { x: -0.65, y: -0.5, label: -1 },
    { x: -0.25, y: -0.65, label: -1 },
    { x: -0.5, y: -0.2, label: -1 },
    { x: -0.7, y: -0.35, label: -1 },
    { x: -0.35, y: -0.75, label: -1 },
  ]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Coordinate conversion
    const toScreenX = (normX: number) => ((normX + 1) / 2) * w;
    const toScreenY = (normY: number) => ((1 - normY) / 2) * h;

    // Draw Subtle Coordinate Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = -1; x <= 1; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toScreenX(x), 0);
      ctx.lineTo(toScreenX(x), h);
      ctx.stroke();
    }
    for (let y = -1; y <= 1; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(0, toScreenY(y));
      ctx.lineTo(w, toScreenY(y));
      ctx.stroke();
    }

    // Origin crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(toScreenX(0), 0);
    ctx.lineTo(toScreenX(0), h);
    ctx.moveTo(0, toScreenY(0));
    ctx.lineTo(w, toScreenY(0));
    ctx.stroke();

    // Draw Decision Boundary Line: w1*x + w2*y + bias = 0  =>  y = (-w1*x - bias) / w2
    if (Math.abs(weights.w2) > 0.0001) {
      const x1 = -1.2;
      const y1 = (-weights.w1 * x1 - weights.bias) / weights.w2;
      const x2 = 1.2;
      const y2 = (-weights.w1 * x2 - weights.bias) / weights.w2;

      ctx.save();
      // Glow effect for decision boundary
      ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(toScreenX(x1), toScreenY(y1));
      ctx.lineTo(toScreenX(x2), toScreenY(y2));
      ctx.stroke();
      ctx.restore();

      // Normal vector indication
      const midX = 0;
      const midY = (-weights.bias) / weights.w2;
      if (Math.abs(midY) <= 1) {
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.7)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(toScreenX(midX), toScreenY(midY));
        ctx.lineTo(toScreenX(midX + weights.w1 * 0.3), toScreenY(midY + weights.w2 * 0.3));
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Draw Data Points
    points.forEach((pt) => {
      const px = toScreenX(pt.x);
      const py = toScreenY(pt.y);

      // Check if correctly classified
      const prediction = weights.w1 * pt.x + weights.w2 * pt.y + weights.bias >= 0 ? 1 : -1;
      const isCorrect = prediction === pt.label;

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);

      if (pt.label === 1) {
        ctx.fillStyle = '#22d3ee';
        ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
      } else {
        ctx.fillStyle = '#a78bfa';
        ctx.shadowColor = 'rgba(167, 139, 250, 0.6)';
      }
      ctx.shadowBlur = isCorrect ? 8 : 2;
      ctx.fill();

      // Border showing correctness
      ctx.strokeStyle = isCorrect ? '#ffffff' : '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    });
  }, [points, weights]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Click on canvas to add a new point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isTraining) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert to normalized coordinates [-1, 1]
    const normX = (clickX / canvas.width) * 2 - 1;
    const normY = 1 - (clickY / canvas.height) * 2;

    soundFx.playClick();
    setPoints((prev) => [...prev, { x: normX, y: normY, label: selectedClass }]);
  };

  // Train Perceptron iterative algorithm
  const handleTrain = () => {
    if (isTraining || points.length === 0) return;
    setIsTraining(true);
    soundFx.playClick();

    let curW1 = weights.w1;
    let curW2 = weights.w2;
    let curBias = weights.bias;

    let curEpoch = 0;

    const interval = setInterval(() => {
      curEpoch++;
      let errorCount = 0;

      // Single epoch of Rosenblatt Perceptron learning rule
      for (const pt of points) {
        const activation = curW1 * pt.x + curW2 * pt.y + curBias;
        const pred: 1 | -1 = activation >= 0 ? 1 : -1;

        if (pred !== pt.label) {
          errorCount++;
          // Weight update: w_new = w_old + eta * (y - y_hat) * x
          const update = learningRate * (pt.label - pred) * 0.5;
          curW1 += update * pt.x;
          curW2 += update * pt.y;
          curBias += update;
        }
      }

      const currentAcc = Math.round(((points.length - errorCount) / points.length) * 100);
      setAccuracy(currentAcc);
      setWeights({ w1: curW1, w2: curW2, bias: curBias });
      setEpochCount(curEpoch);

      if (curEpoch >= epochs || errorCount === 0) {
        clearInterval(interval);
        setIsTraining(false);
        soundFx.playSuccess();
      }
    }, 40);
  };

  const handleReset = () => {
    soundFx.playClick();
    setWeights({ w1: 0.6, w2: -0.7, bias: 0.05 });
    setEpochCount(0);
    setAccuracy(100);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d19]/90 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-4">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>Interactive Perceptron Sandbox</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                LIVE 2D MODEL
              </span>
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Click canvas to place data points &bull; Watch hyperplane converge
            </p>
          </div>
        </div>

        {/* Real-time stats */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
            Accuracy: <span className="text-cyan-400 font-bold">{accuracy}%</span>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
            Epoch: <span className="text-violet-400 font-bold">{epochCount}</span>/{epochs}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative rounded-xl border border-white/15 bg-[#03060d] overflow-hidden shadow-inner cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={340}
              height={260}
              onClick={handleCanvasClick}
              className="w-full max-w-[340px] h-[240px] sm:h-[260px] block select-none"
              title="Click on the plane to add a new data point"
            />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-500 bg-black/60 px-2 py-0.5 rounded-sm pointer-events-none">
              Tap to add sample
            </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400/80 bg-black/60 px-2 py-0.5 rounded-sm pointer-events-none">
              Boundary: {weights.w1.toFixed(2)}x + {weights.w2.toFixed(2)}y + {weights.bias.toFixed(2)} = 0
            </div>
          </div>

          {/* Class selector */}
          <div className="flex items-center gap-3 mt-3 text-xs font-mono">
            <span className="text-neutral-400">Class to Add:</span>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setSelectedClass(1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedClass === 1
                  ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-xs shadow-cyan-500/30'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Cyan (+1)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setSelectedClass(-1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedClass === -1
                  ? 'border-violet-400 bg-violet-950/80 text-violet-300 shadow-xs shadow-violet-500/30'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span>Violet (-1)</span>
            </button>
          </div>
        </div>

        {/* Right: Controls & Hyperparameters */}
        <div className="lg:col-span-5 space-y-4 text-xs font-mono">
          {/* Hyperparameters */}
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1">
                <span>Learning Rate (&eta;)</span>
                <span className="text-cyan-400 font-bold">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1">
                <span>Max Epochs</span>
                <span className="text-violet-400 font-bold">{epochs}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={epochs}
                onChange={(e) => setEpochs(parseInt(e.target.value, 10))}
                className="w-full accent-violet-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTrain}
              disabled={isTraining}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-neutral-950 font-bold font-sans text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black text-black" />
              <span>{isTraining ? 'Training Model...' : 'Train Perceptron'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Reset weights"
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-white/5 text-[11px] text-neutral-400 leading-relaxed font-sans">
            <span className="text-cyan-400 font-semibold font-mono">Mathematical insight:</span> Demonstrates
            supervised binary classification via stochastic gradient descent updating hyperplane coefficients.
          </div>
        </div>
      </div>
    </div>
  );
}
