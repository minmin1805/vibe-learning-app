export const bloomLevelPrompts = {
    remember: `Create the "Remember" section of a lesson following Bloom's Taxonomy.
    Return ONLY a JSON object matching this schema:
    {
      "learningObjectives": ["string"],
      "openingQuestion": "string",
      "shortAnswer": "string",
      "keyDefinition": {
        "title": "string",
        "definition": "string"
      },
      "coreComponents": [
        {
          "term": "string",
          "definition": "string"
        }
      ],
      "knowledgeCheck": {
        "question": "string",
        "options": ["string"],
        "correctAnswerIndex": number
      },
      "dragAndDrop": {
        "terms": ["string"],
        "definitions": ["string"],
        "correctMatches": {"term": "definition"}
      },
      "deepDive": [
        {
          "title": "string",
          "content": "string"
        }
      ]
    }`,
  
    understand: `Create the "Understand" section of a lesson following Bloom's Taxonomy.
    Return ONLY a JSON object matching this schema:
    {
      "learningObjectives": ["string"],
      "conceptExplanation": {
        "title": "string",
        "explanation": "string"
      },
      "examples": [
        {
          "scenario": "string",
          "explanation": "string"
        }
      ],
      "interactiveComparison": {
        "title": "string",
        "items": [
          {
            "concept": "string",
            "characteristics": ["string"]
          }
        ]
      },
      "understandingCheck": {
        "question": "string",
        "options": ["string"],
        "correctAnswerIndex": number
      }
    }`,
  
    apply: `Create the "Apply" section of a lesson following Bloom's Taxonomy.
    Return ONLY a JSON object matching this schema:
    {
      "learningObjectives": ["string"],
      "sectionContent": {
        "title": "string",
        "content": "string"
      },
      "problemSolvingChallenge": [
        {
          "scenario": "string",
          "approachOptions": ["string"],
          "justificationPrompt": "string"
        }
      ],
      "workflowImplementation": {
        "title": "string",
        "steps": ["string"],
        "correctOrder": [number]
      },
      "applicationChallenge": {
        "question": "string",
        "options": ["string"],
        "correctAnswerIndex": number
      }
    }`,
  
    analyze: `Create the "Analyze" section of a lesson following Bloom's Taxonomy.
    Return ONLY a JSON object matching this schema:
    {
      "learningObjectives": ["string"],
      "sectionContent": {
        "title": "string",
        "content": "string"
      },
      "algorithmAnalysis": {
        "title": "string",
        "characteristics": ["string"],
        "algorithms": ["string"],
        "correctMatches": {"characteristic": ["algorithm"]}
      },
      "analysisExercise": [
        {
          "scenario": "string",
          "reasonOptions": ["string"],
          "analysisPrompt": "string"
        }
      ],
      "criticalAnalysis": {
        "question": "string",
        "options": ["string"],
        "correctAnswerIndex": number
      }
    }`,
  
    evaluate: `Create the "Evaluate" section of a lesson following Bloom's Taxonomy.
    Return ONLY a JSON object matching this schema:
    {
      "learningObjectives": ["string"],
      "sectionContent": {
        "title": "string",
        "content": "string"
      },
      "evaluationFramework": {
        "title": "string",
        "criteria": ["string"],
        "context": "string"
      },
      "businessContextEvaluation": [
        {
          "scenario": "string",
          "approachOptions": ["string"],
          "justificationPrompt": "string"
        }
      ],
      "evaluationChallenge": {
        "question": "string",
        "options": ["string"],
        "correctAnswerIndex": number,
        "feedback": "string"
      },
      "criticalEvaluation": {
        "scenario": "string",
        "concernOptions": ["string"],
        "solutionPrompt": "string",
        "metricsPrompt": "string",
        "feedback": "string"
      }
    }`,
  
    create: `Create the "Create" section of a lesson following Bloom's Taxonomy.
    Return ONLY a JSON object matching this schema:
    {
      "learningObjectives": ["string"],
      "sectionContent": {
        "title": "string",
        "content": "string"
      },
      "creativeChallenge": {
        "title": "string",
        "problemDomains": ["string"]
      },
      "solutionBlueprint": {
        "sections": [
          {
            "title": "string",
            "prompt": "string"
          }
        ]
      },
      "implementationRoadmap": {
        "phases": [
          {
            "title": "string",
            "steps": ["string"]
          }
        ]
      },
      "synthesisChallenge": {
        "question": "string",
        "options": ["string"],
        "correctAnswerIndex": number
      },
      "solutionPresentation": {
        "sections": [
          {
            "title": "string",
            "prompt": "string",
            "timeLimit": "string"
          }
        ]
      }
    }`
  }; 