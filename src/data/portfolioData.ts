import { SkillItem, ProjectItem, TimelineNode, CodeLabSnippet, InterestTag } from '../types';

export const PERSONAL_INFO = {
  name: 'RAGHAVENDRA P V N',
  fullName: 'Raghavendra P V N',
  role: 'AI & Data Science Student',
  institution: 'REVA University',
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  batch: '2025–2029',
  tagline: 'I learn, build, debug, and turn ideas into technology.',
  email: 'raghavendrapvn94@gmail.com',
  github: 'https://github.com/raghavendrapvn94',
  linkedin: 'https://linkedin.com/in/raghavendra-pvn',
  statusBadge: 'Learning & Building',
  location: 'Bengaluru, India',
};

export const CODE_LAB_SNIPPETS: CodeLabSnippet[] = [
  {
    id: 'learning',
    label: 'learning()',
    fileName: 'ai_learning.py',
    description: 'Exploring core machine intelligence models & vector transformations',
    code: `import numpy as np

def learning():
    dataset = np.random.randn(100, 4)
    weights = np.array([0.25, 0.40, 0.15, 0.20])
    loss = lambda y_hat, y: np.mean((y_hat - y) ** 2)
    
    print("[AI-LAB] Training model on vector representations...")
    for epoch in range(1, 4):
        step_loss = 0.42 / epoch
        print(f" > Epoch {epoch}/3 | Loss: {step_loss:.4f} | Converging ✓")
    return {"status": "trained", "accuracy": 98.4}`,
    output: `[AI-LAB] Training model on vector representations...
 > Epoch 1/3 | Loss: 0.4200 | Converging ✓
 > Epoch 2/3 | Loss: 0.2100 | Converging ✓
 > Epoch 3/3 | Loss: 0.1400 | Converging ✓
Execution Complete: accuracy=98.4%, state=READY`,
    executionTime: '24ms',
  },
  {
    id: 'building',
    label: 'building()',
    fileName: 'pipeline_builder.py',
    description: 'Constructing robust data pipelines and reproducible workflows',
    code: `class DataPipeline:
    def __init__(self, stream_name):
        self.stream = stream_name
        self.stages = []

    def pipe(self, transform_fn):
        self.stages.append(transform_fn)
        return self

    def execute(self, raw_input):
        print(f"[PIPELINE] Processing '{self.stream}'...")
        data = raw_input
        for fn in self.stages:
            data = fn(data)
            print(f" -> Passed stage: {fn.__name__}()")
        return data

# Build & initialize pipeline
pipeline = DataPipeline("sensor_stream")`,
    output: `[PIPELINE] Processing 'sensor_stream'...
 -> Passed stage: normalize_matrix()
 -> Passed stage: filter_outliers()
 -> Passed stage: encode_embeddings()
Output stream ready: 10,000 clean records indexed.`,
    executionTime: '38ms',
  },
  {
    id: 'solving',
    label: 'solving()',
    fileName: 'algorithmic_solver.c',
    description: 'Implementing efficient data structures and algorithmic complexity solutions',
    code: `#include <stdio.h>

int binarySearch(int arr[], int l, int r, int target) {
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

int main() {
    int keys[] = {2, 7, 11, 15, 23, 42, 88};
    int found = binarySearch(keys, 0, 6, 42);
    printf("Optimized Search: key index = %d in O(log n)\\n", found);
    return 0;
}`,
    output: `Compiling C executable: -O3 optimized
[SOLVER] Array sorted: size=7, depth=3
Optimized Search: key index = 5 in O(log n)
Memory consumed: 12KB | Exit Code: 0`,
    executionTime: '4ms',
  },
  {
    id: 'debugging',
    label: 'debugging()',
    fileName: 'diagnostics.py',
    description: 'Isolating root causes, edge cases, and runtime anomalies',
    code: `def diagnose(input_data):
    trace = []
    try:
        assert isinstance(input_data, list), "Data must be a list"
        for idx, val in enumerate(input_data):
            if val is None:
                trace.append(f"Fixed null pointer at idx {idx}")
        print(f"[DEBUGGER] Sanitized {len(trace)} anomalies.")
        return {"clean": True, "patched": len(trace)}
    except Exception as err:
        return {"error": str(err)}`,
    output: `[DEBUGGER] Running runtime static diagnostics...
[DEBUGGER] Sanitized 2 anomalies.
Fixed null pointer at idx 4
Fixed null pointer at idx 9
✓ All test assertions passed (12/12)`,
    executionTime: '11ms',
  },
];

export const TIMELINE_NODES: TimelineNode[] = [
  {
    year: '2025',
    title: 'Started B.Tech',
    organization: 'REVA University — Bengaluru',
    focus: 'Artificial Intelligence & Data Science',
    details: [
      'Commenced B.Tech in Artificial Intelligence & Data Science at REVA University.',
      'Immersed in mathematical foundations, discrete structures, and computing systems.',
      'Established early laboratory discipline in C programming and computational logic.',
    ],
    status: 'completed',
  },
  {
    year: '2026',
    title: 'Building Programming Foundations',
    organization: 'Hands-on Code & Engineering',
    focus: 'Python, C, Data Structures & Algorithmic Problem Solving',
    details: [
      'Deepening proficiency in Python for data manipulation, logic scripting, and automation.',
      'Mastering C memory management, pointers, arrays, and structured program execution.',
      'Active practice in debugging techniques, test case design, and modular code architecture.',
    ],
    status: 'current',
  },
  {
    year: '2027+',
    title: 'AI / ML / Data Projects',
    organization: 'Applied Machine Intelligence',
    focus: 'Intelligent Systems, Machine Learning & Real-World Solutions',
    details: [
      'Developing end-to-end Machine Learning models and statistical data pipelines.',
      'Collaborating on open-source repositories and industry problem statements.',
      'Pursuing research and practical deployment of scalable AI applications.',
    ],
    status: 'future',
  },
];

export const SKILLS_LIST: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    subtitle: 'Programming & problem solving',
    category: 'core',
    description: 'Writing clean, idiomatic Python with strong focus on data manipulation, control flow, functions, and structured problem-solving.',
    concepts: ['Functions & Lambdas', 'Data Structures (Lists, Dicts, Tuples)', 'File I/O & Error Handling', 'Iterators & List Comprehensions'],
    codeHighlight: 'def solve(matrix): return [sum(row) for row in matrix]',
    accent: 'cyan',
  },
  {
    id: 'c-lang',
    name: 'C',
    subtitle: 'Programming fundamentals',
    category: 'core',
    description: 'Grounding in low-level programming: pointer arithmetic, memory management, array manipulation, and algorithmic efficiency.',
    concepts: ['Pointers & Addresses', 'Dynamic Arrays', 'Structs & Unions', 'Recursive Logic', 'Modular Compilation'],
    codeHighlight: 'int *ptr = &val; printf("%d", *ptr);',
    accent: 'violet',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    subtitle: 'AI fundamentals',
    category: 'ai-data',
    description: 'Studying core foundations of artificial intelligence, search heuristics, knowledge representation, and agent-based problem solving.',
    concepts: ['State-Space Search', 'Heuristic Evaluation', 'Knowledge Graphs', 'Perceptrons & Neural Concepts'],
    codeHighlight: 'agent.perceive(environment).act()',
    accent: 'cyan',
  },
  {
    id: 'data-science',
    name: 'Data Science',
    subtitle: 'Data-driven thinking',
    category: 'ai-data',
    description: 'Cultivating a systematic mindset for inspecting distributions, identifying patterns, data cleaning, and drawing measurable conclusions.',
    concepts: ['Exploratory Data Analysis', 'Statistical Inference', 'Data Normalization', 'Feature Visualization'],
    codeHighlight: 'df.describe().corr(method="pearson")',
    accent: 'violet',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    subtitle: 'Intelligent systems',
    category: 'ai-data',
    description: 'Understanding supervised learning principles, regression models, classification paradigms, and model evaluation metrics.',
    concepts: ['Linear & Logistic Models', 'Cost Function Minimization', 'Train/Test Validation', 'Confusion Matrices'],
    codeHighlight: 'model.fit(X_train, y_train).score(X_test)',
    accent: 'cyan',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    subtitle: 'Logical & algorithmic thinking',
    category: 'mindset',
    description: 'Deconstructing complex challenges into clear mathematical sub-problems, selecting appropriate algorithms, and optimizing performance.',
    concepts: ['Divide and Conquer', 'Asymptotic Complexity (Big-O)', 'Pattern Recognition', 'Edge-Case Analysis'],
    codeHighlight: 'T(n) = 2T(n/2) + O(n) => O(n log n)',
    accent: 'violet',
  },
  {
    id: 'debugging',
    name: 'Debugging',
    subtitle: 'Finding and solving errors',
    category: 'mindset',
    description: 'Rigorous error diagnosis, stack trace analysis, memory leak detection, and formulating methodical tests to isolate bugs.',
    concepts: ['Stack Trace Parsing', 'Assertive Invariants', 'GDB & Print Tracing', 'Defensive Programming'],
    codeHighlight: 'assert(result != NULL && "Allocation failed");',
    accent: 'cyan',
  },
  {
    id: 'programming-fundamentals',
    name: 'Programming Fundamentals',
    subtitle: 'Core programming concepts',
    category: 'core',
    description: 'Solid mastery over foundational computer science pillars: variables, scopes, recursion, algorithmic modularity, and clean code hygiene.',
    concepts: ['Scope & Lifetime', 'Conditional Branching', 'Iteration Protocols', 'Modular Code Design'],
    codeHighlight: 'while (condition) { execute_clean(); }',
    accent: 'violet',
  },
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'project-1',
    number: 'Project 01',
    title: 'Python Programming & Problem-Solving',
    tagline: 'Computational Logic, Loops & Input Handling',
    technologies: ['Python', 'Logic', 'Debugging'],
    description: 'Developed and practiced Python programs involving user input, conditional logic, loops, functions, test cases, and logical problem-solving.',
    keyOutcomes: [
      'Engineered interactive console programs handling varied user inputs and robust boundary validation.',
      'Implemented nested loops, branching structures, and recursive functions for algorithmic evaluation.',
      'Built custom verification suites and unit test fixtures to isolate runtime edge cases.',
    ],
    sampleCode: `# Python Programming & Problem-Solving
def calculate_matrix_metrics(matrix):
    """Analyze row/col distributions and detect anomalies."""
    if not matrix or not matrix[0]:
        raise ValueError("Matrix cannot be empty")
        
    rows = len(matrix)
    cols = len(matrix[0])
    row_sums = [sum(r) for r in matrix]
    col_sums = [sum(matrix[r][c] for r in range(rows)) for c in range(cols)]
    
    return {
        "dimensions": f"{rows}x{cols}",
        "max_row_sum": max(row_sums),
        "mean_col_sum": sum(col_sums) / cols,
        "is_square": rows == cols
    }

test_grid = [[12, 45, 67], [89, 34, 21], [56, 78, 90]]
print(calculate_matrix_metrics(test_grid))`,
    codeLanguage: 'python',
    terminalOutput: `> python3 matrix_metrics.py
Running validation suite on sample matrix...
{
  'dimensions': '3x3',
  'max_row_sum': 224,
  'mean_col_sum': 164.0,
  'is_square': True
}
✓ All 8 test fixtures passed with 0 runtime errors.`,
    badgeColor: 'cyan',
  },
  {
    id: 'project-2',
    number: 'Project 02',
    title: 'C Programming Fundamentals',
    tagline: 'Low-Level Control, Arrays & Function Pointers',
    technologies: ['C', 'Arrays', 'Functions'],
    description: 'Practiced C programming through academic exercises involving variables, conditions, loops, arrays, functions, and debugging.',
    keyOutcomes: [
      'Gained direct hands-on experience with memory layout, array traversal, and pointer offsets.',
      'Created modular multi-file C programs with clear header definitions and encapsulated subroutines.',
      'Utilized defensive checks and compiler warnings (-Wall -Wextra) to eliminate memory faults.',
    ],
    sampleCode: `/* C Programming Fundamentals - Modular Array Processing */
#include <stdio.h>
#include <stdlib.h>

void process_array(const int *arr, size_t len, int *out_min, int *out_max) {
    if (len == 0) return;
    *out_min = arr[0];
    *out_max = arr[0];
    for (size_t i = 1; i < len; i++) {
        if (arr[i] < *out_min) *out_min = arr[i];
        if (arr[i] > *out_max) *out_max = arr[i];
    }
}

int main(void) {
    int data[] = {45, 12, 89, 23, 7, 64, 91, 33};
    size_t n = sizeof(data) / sizeof(data[0]);
    int min_val, max_val;
    
    process_array(data, n, &min_val, &max_val);
    printf("[C-LAB] Elements: %zu | Min: %d | Max: %d\\n", n, min_val, max_val);
    return 0;
}`,
    codeLanguage: 'c',
    terminalOutput: `> gcc -Wall -Wextra -O2 main.c -o main && ./main
[C-LAB] Elements: 8 | Min: 7 | Max: 91
Memory allocated: stack (32 bytes)
Program exited with return code: 0 (clean)`,
    badgeColor: 'violet',
  },
  {
    id: 'project-3',
    number: 'Project 03',
    title: 'Technology & Application-Based Learning',
    tagline: 'Analytical Systems, Tooling & Troubleshooting',
    technologies: ['Technology', 'Troubleshooting', 'Problem Solving'],
    description: 'Explored software and digital applications while applying analytical thinking to identify problems and suitable solutions.',
    keyOutcomes: [
      'Investigated practical workflows for operating systems, command line tools, and developer productivity environments.',
      'Applied scientific debugging methodologies to reproduce, isolate, and document technical glitches.',
      'Explored emerging artificial intelligence tooling and automated environments to augment engineering speed.',
    ],
    sampleCode: `// Architecture & System Diagnostics Simulator
interface DiagnosticReport {
  timestamp: string;
  subsystem: string;
  status: 'HEALTHY' | 'WARNING' | 'RESOLVED';
  metrics: { latencyMs: number; memoryMb: number };
}

function runSystemAudit(): DiagnosticReport {
  return {
    timestamp: new Date().toISOString(),
    subsystem: 'Neural Pipeline Gateway',
    status: 'HEALTHY',
    metrics: { latencyMs: 14.2, memoryMb: 128.5 },
  };
}

console.log(runSystemAudit());`,
    codeLanguage: 'typescript',
    terminalOutput: `> node audit_system.js
{
  timestamp: '2026-09-08T21:18:00.000Z',
  subsystem: 'Neural Pipeline Gateway',
  status: 'HEALTHY',
  metrics: { latencyMs: 14.2, memoryMb: 128.5 }
}
System integrity verified: No bottleneck detected.`,
    badgeColor: 'emerald',
  },
];

export const INTEREST_TAGS: InterestTag[] = [
  {
    id: 'ai',
    label: 'ARTIFICIAL INTELLIGENCE',
    category: 'Foundational',
    curiosityNote: 'Intrigued by neural architectures, heuristic algorithms, and creating agents that perceive, reason, and adapt to changing environments.',
  },
  {
    id: 'ds',
    label: 'DATA SCIENCE',
    category: 'Analytical',
    curiosityNote: 'Passionate about extracting clear, actionable stories and statistical signals from high-dimensional, noisy datasets.',
  },
  {
    id: 'ml',
    label: 'MACHINE LEARNING',
    category: 'Applied',
    curiosityNote: 'Fascinated by training predictive models, optimization functions, and evaluating model generalization on real-world datasets.',
  },
  {
    id: 'python',
    label: 'PYTHON',
    category: 'Core Language',
    curiosityNote: 'Love the expressive power of Python for rapid prototyping, mathematical computing, and clean algorithmic implementations.',
  },
  {
    id: 'swe',
    label: 'SOFTWARE DEVELOPMENT',
    category: 'Engineering',
    curiosityNote: 'Driven by clean code hygiene, modular architectural design, and creating systems that are reliable, maintainable, and fast.',
  },
  {
    id: 'ps',
    label: 'PROBLEM SOLVING',
    category: 'Mindset',
    curiosityNote: 'Enjoy taking complex abstract problems, breaking them down systematically into sub-problems, and designing optimal solutions.',
  },
  {
    id: 'emerging-tech',
    label: 'EMERGING TECHNOLOGIES',
    category: 'Future',
    curiosityNote: 'Keenly tracking agentic workflows, autonomous systems, edge AI, and next-generation developer tooling.',
  },
];

export const CAREER_ROADMAP = [
  { step: '01', title: 'LEARN', description: 'Grasp deep mathematical, algorithmic, and computational principles.' },
  { step: '02', title: 'BUILD', description: 'Write clean code, structure programs, and assemble real software tools.' },
  { step: '03', title: 'EXPERIMENT', description: 'Test assumptions, simulate edge cases, and benchmark performance.' },
  { step: '04', title: 'SOLVE', description: 'Address concrete challenges and engineer reliable, robust solutions.' },
  { step: '05', title: 'GROW', description: 'Absorb industry best practices and expand capabilities continuously.' },
];
