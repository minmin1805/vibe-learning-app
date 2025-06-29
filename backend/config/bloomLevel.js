// JSON Schemas and Prompts for Bloom's Taxonomy Levels

export const bloomLevelSchemas = {
  remember: {
    type: "object",
    properties: {
      learningObjectives: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
      },
      openingQuestion: { type: "string" },
      shortAnswer: { type: "string" },
      keyDefinition: {
        type: "object",
        properties: {
          title: { type: "string" },
          definition: { type: "string" },
        },
        required: ["title", "definition"],
      },
      coreComponents: {
        type: "array",
        items: {
          type: "object",
          properties: {
            term: { type: "string" },
            definition: { type: "string" },
          },
          required: ["term", "definition"],
        },
      },
      knowledgeCheck: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswerIndex: { type: "number", minimum: 0, maximum: 3 },
        },
        required: ["question", "options", "correctAnswerIndex"],
      },
      dragAndDrop: {
        type: "object",
        properties: {
          terms: { type: "array", items: { type: "string" } },
          definitions: { type: "array", items: { type: "string" } },
          correctMatches: {
            type: "object",
            additionalProperties: { type: "string" },
          },
        },
        required: ["terms", "definitions", "correctMatches"],
      },
      deepDive: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
          required: ["title", "content"],
        },
      },
    },
    required: [
      "learningObjectives",
      "openingQuestion",
      "shortAnswer",
      "keyDefinition",
      "coreComponents",
      "knowledgeCheck",
      "dragAndDrop",
      "deepDive",
    ],
  },

  understand: {
    type: "object",
    properties: {
      learningObjectives: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
      },
      conceptExplanation: {
        type: "object",
        properties: {
          title: { type: "string" },
          explanation: { type: "string" },
        },
        required: ["title", "explanation"],
      },
      examples: {
        type: "array",
        items: {
          type: "object",
          properties: {
            scenario: { type: "string" },
            explanation: { type: "string" },
          },
          required: ["scenario", "explanation"],
        },
      },
      interactiveComparison: {
        type: "object",
        properties: {
          title: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                concept: { type: "string" },
                characteristics: { type: "array", items: { type: "string" } },
              },
              required: ["concept", "characteristics"],
            },
          },
        },
        required: ["title", "items"],
      },
      understandingCheck: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswerIndex: { type: "number", minimum: 0, maximum: 3 },
        },
        required: ["question", "options", "correctAnswerIndex"],
      },
      matchingExercise: {
        type: "object",
        properties: {
          title: { type: "string" },
          instructions: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                example: { type: "string" },
                type: { type: "string" }
              },
              required: ["example", "type"]
            }
          },
          options: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["title", "instructions", "items", "options"]
      }
    },
    required: [
      "learningObjectives",
      "conceptExplanation",
      "examples",
      "interactiveComparison",
      "understandingCheck",
      "matchingExercise"
    ],
  },

  apply: {
    type: "object",
    properties: {
      learningObjectives: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
      },
      sectionContent: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
        },
        required: ["title", "content"],
      },
      problemSolvingChallenge: {
        type: "array",
        items: {
          type: "object",
          properties: {
            scenario: { type: "string" },
            approachOptions: { type: "array", items: { type: "string" } },
            justificationPrompt: { type: "string" },
          },
          required: ["scenario", "approachOptions", "justificationPrompt"],
        },
      },
      workflowImplementation: {
        type: "object",
        properties: {
          title: { type: "string" },
          steps: { type: "array", items: { type: "string" } },
          correctOrder: { type: "array", items: { type: "number" } },
        },
        required: ["title", "steps", "correctOrder"],
      },
      applicationChallenge: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswerIndex: { type: "number", minimum: 0, maximum: 3 },
        },
        required: ["question", "options", "correctAnswerIndex"],
      },
    },
    required: [
      "learningObjectives",
      "sectionContent",
      "problemSolvingChallenge",
      "workflowImplementation",
      "applicationChallenge",
    ],
  },

  analyze: {
    type: "object",
    properties: {
      learningObjectives: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
      },
      sectionContent: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
        },
        required: ["title", "content"],
      },
      algorithmAnalysis: {
        type: "object",
        properties: {
          title: { type: "string" },
          characteristics: { type: "array", items: { type: "string" } },
          algorithms: { type: "array", items: { type: "string" } },
          correctMatches: {
            type: "object",
            additionalProperties: { type: "array", items: { type: "string" } },
          },
        },
        required: ["title", "characteristics", "algorithms", "correctMatches"],
      },
      analysisExercise: {
        type: "array",
        items: {
          type: "object",
          properties: {
            scenario: { type: "string" },
            reasonOptions: { type: "array", items: { type: "string" } },
            analysisPrompt: { type: "string" },
          },
          required: ["scenario", "reasonOptions", "analysisPrompt"],
        },
      },
      criticalAnalysis: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswerIndex: { type: "number", minimum: 0, maximum: 3 },
        },
        required: ["question", "options", "correctAnswerIndex"],
      },
    },
    required: [
      "learningObjectives",
      "sectionContent",
      "algorithmAnalysis",
      "analysisExercise",
      "criticalAnalysis",
    ],
  },

  evaluate: {
    type: "object",
    properties: {
      learningObjectives: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
      },
      sectionContent: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
        },
        required: ["title", "content"],
      },
      evaluationFramework: {
        type: "object",
        properties: {
          title: { type: "string" },
          criteria: { type: "array", items: { type: "string" } },
          context: { type: "string" },
        },
        required: ["title", "criteria", "context"],
      },
      businessContextEvaluation: {
        type: "array",
        items: {
          type: "object",
          properties: {
            scenario: { type: "string" },
            approachOptions: { type: "array", items: { type: "string" } },
            justificationPrompt: { type: "string" },
          },
          required: ["scenario", "approachOptions", "justificationPrompt"],
        },
      },
      evaluationChallenge: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswerIndex: { type: "number", minimum: 0, maximum: 3 },
          feedback: { type: "string" },
        },
        required: ["question", "options", "correctAnswerIndex", "feedback"],
      },
      criticalEvaluation: {
        type: "object",
        properties: {
          scenario: { type: "string" },
          concernOptions: { type: "array", items: { type: "string" } },
          solutionPrompt: { type: "string" },
          metricsPrompt: { type: "string" },
          feedback: { type: "string" },
        },
        required: [
          "scenario",
          "concernOptions",
          "solutionPrompt",
          "metricsPrompt",
          "feedback",
        ],
      },
    },
    required: [
      "learningObjectives",
      "sectionContent",
      "evaluationFramework",
      "businessContextEvaluation",
      "evaluationChallenge",
      "criticalEvaluation",
    ],
  },

  create: {
    type: "object",
    properties: {
      learningObjectives: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 5,
      },
      sectionContent: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
        },
        required: ["title", "content"],
      },
      creativeChallenge: {
        type: "object",
        properties: {
          title: { type: "string" },
          problemDomains: { type: "array", items: { type: "string" } },
        },
        required: ["title", "problemDomains"],
      },
      solutionBlueprint: {
        type: "object",
        properties: {
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                prompt: { type: "string" },
              },
              required: ["title", "prompt"],
            },
          },
        },
        required: ["sections"],
      },
      implementationRoadmap: {
        type: "object",
        properties: {
          phases: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                steps: { type: "array", items: { type: "string" } },
              },
              required: ["title", "steps"],
            },
          },
        },
        required: ["phases"],
      },
      synthesisChallenge: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswerIndex: { type: "number", minimum: 0, maximum: 3 },
        },
        required: ["question", "options", "correctAnswerIndex"],
      },
      solutionPresentation: {
        type: "object",
        properties: {
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                prompt: { type: "string" },
                timeLimit: { type: "string" },
              },
              required: ["title", "prompt", "timeLimit"],
            },
          },
        },
        required: ["sections"],
      },
    },
    required: [
      "learningObjectives",
      "sectionContent",
      "creativeChallenge",
      "solutionBlueprint",
      "implementationRoadmap",
      "synthesisChallenge",
      "solutionPresentation",
    ],
  },
};

export const bloomLevelPrompts = {
  remember: `Create the "Remember" section of a lesson based on the provided text, following Bloom's Taxonomy.
    You MUST return ONLY a valid JSON object that strictly adheres to the following schema and constraints. Do not include any explanatory text, markdown, or code block syntax around the JSON.

    Constraints:
    - learningObjectives: MUST be an array of 3 to 5 strings.
    - knowledgeCheck.options: MUST be an array of exactly 4 strings.
    - dragAndDrop: The 'terms' and 'definitions' arrays MUST have the same number of items. 'correctMatches' MUST correctly map each term to its definition.

    Schema:
    {
      "learningObjectives": ["string", "string", "string"],
      "openingQuestion": "string",
      "shortAnswer": "string",
      "keyDefinition": { "title": "string", "definition": "string" },
      "coreComponents": [{ "term": "string", "definition": "string" }],
      "knowledgeCheck": { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0 },
      "dragAndDrop": { "terms": ["string"], "definitions": ["string"], "correctMatches": {"term": "definition"} },
      "deepDive": [{ "title": "string", "content": "string" }]
    }`,

  understand: `Create the "Understand" section of a lesson based on the provided text, following Bloom's Taxonomy.
    You MUST return ONLY a valid JSON object that strictly adheres to the following schema and constraints. Do not include any explanatory text, markdown, or code block syntax around the JSON.

    Constraints:
    - learningObjectives: MUST be an array of 3 to 5 strings.
    - examples: MUST contain 2 to 3 scenario/explanation pairs.
    - interactiveComparison.items: MUST contain at least 2 concepts for comparison.
    - understandingCheck.options: MUST be an array of exactly 4 strings.
    - matchingExercise.items: MUST contain 3 to 5 example/type pairs. The options array MUST contain all unique types used in the items.

    Schema:
    {
      "learningObjectives": ["string", "string", "string"],
      "conceptExplanation": { "title": "string", "explanation": "string" },
      "examples": [{ "scenario": "string", "explanation": "string" }, { "scenario": "string", "explanation": "string" }],
      "interactiveComparison": { "title": "string", "items": [{ "concept": "string", "characteristics": ["string"] }, { "concept": "string", "characteristics": ["string"] }] },
      "understandingCheck": { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0 },
      "matchingExercise": {
        "title": "string",
        "instructions": "string",
        "items": [
          { "example": "string", "type": "string"}
        ],
        "options": ["string"]
      }
    }`,

  apply: `Create the "Apply" section of a lesson based on the provided text, following Bloom's Taxonomy.
    You MUST return ONLY a valid JSON object that strictly adheres to the following schema and constraints. Do not include any explanatory text, markdown, or code block syntax around the JSON.

    Constraints:
    - learningObjectives: MUST be an array of 3 to 5 strings.
    - problemSolvingChallenge: MUST contain 1 to 2 scenarios.
    - workflowImplementation.steps and correctOrder: The 'correctOrder' array MUST be a permutation of the indices of the 'steps' array.
    - applicationChallenge.options: MUST be an array of exactly 4 strings.

    Schema:
    {
      "learningObjectives": ["string", "string", "string"],
      "sectionContent": { "title": "string", "content": "string" },
      "problemSolvingChallenge": [{ "scenario": "string", "approachOptions": ["string"], "justificationPrompt": "string" }],
      "workflowImplementation": { "title": "string", "steps": ["string"], "correctOrder": [0, 1, 2] },
      "applicationChallenge": { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0 }
    }`,

  analyze: `Create the "Analyze" section of a lesson based on the provided text, following Bloom's Taxonomy.
    You MUST return ONLY a valid JSON object that strictly adheres to the following schema and constraints. Do not include any explanatory text, markdown, or code block syntax around the JSON.
    
    Constraints:
    - learningObjectives: MUST be an array of 3 to 5 strings.
    - algorithmAnalysis.correctMatches: The keys MUST be from 'characteristics' and values MUST be arrays of items from 'algorithms'.
    - analysisExercise: MUST contain 1 to 2 exercises.
    - criticalAnalysis.options: MUST be an array of exactly 4 strings.

    Schema:
    {
      "learningObjectives": ["string", "string", "string"],
      "sectionContent": { "title": "string", "content": "string" },
      "algorithmAnalysis": { "title": "string", "characteristics": ["string"], "algorithms": ["string"], "correctMatches": {"characteristic": ["algorithm"]} },
      "analysisExercise": [{ "scenario": "string", "reasonOptions": ["string"], "analysisPrompt": "string" }],
      "criticalAnalysis": { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0 }
    }`,

  evaluate: `Create the "Evaluate" section of a lesson based on the provided text, following Bloom's Taxonomy.
    You MUST return ONLY a valid JSON object that strictly adheres to the following schema and constraints. Do not include any explanatory text, markdown, or code block syntax around the JSON.

    Constraints:
    - learningObjectives: MUST be an array of 3 to 5 strings.
    - businessContextEvaluation: MUST contain 1 to 2 scenarios.
    - evaluationChallenge.options: MUST be an array of exactly 4 strings.

    Schema:
    {
      "learningObjectives": ["string", "string", "string"],
      "sectionContent": { "title": "string", "content": "string" },
      "evaluationFramework": { "title": "string", "criteria": ["string"], "context": "string" },
      "businessContextEvaluation": [{ "scenario": "string", "approachOptions": ["string"], "justificationPrompt": "string" }],
      "evaluationChallenge": { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0, "feedback": "string" },
      "criticalEvaluation": { "scenario": "string", "concernOptions": ["string"], "solutionPrompt": "string", "metricsPrompt": "string", "feedback": "string" }
    }`,

  create: `Create the "Create" section of a lesson based on the provided text, following Bloom's Taxonomy.
    You MUST return ONLY a valid JSON object that strictly adheres to the following schema and constraints. Do not include any explanatory text, markdown, or code block syntax around the JSON.

    Constraints:
    - learningObjectives: MUST be an array of 3 to 5 strings.
    - synthesisChallenge.options: MUST be an array of exactly 4 strings.

    Schema:
    {
      "learningObjectives": ["string", "string", "string"],
      "sectionContent": { "title": "string", "content": "string" },
      "creativeChallenge": { "title": "string", "problemDomains": ["string"] },
      "solutionBlueprint": { "sections": [{ "title": "string", "prompt": "string" }] },
      "implementationRoadmap": { "phases": [{ "title": "string", "steps": ["string"] }] },
      "synthesisChallenge": { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0 },
      "solutionPresentation": { "sections": [{ "title": "string", "prompt": "string", "timeLimit": "string" }] }
    }`,
};
