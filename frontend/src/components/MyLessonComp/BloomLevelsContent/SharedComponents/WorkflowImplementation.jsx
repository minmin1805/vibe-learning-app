import React, { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";

function DraggableStep({ id, content, isOverlay }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    zIndex: isDragging ? 100 : "auto",
  };

  const overlayStyle = {
    cursor: "grabbing",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...(isOverlay && overlayStyle) }}
      {...attributes}
      {...listeners}
      className="bg-indigo-600 text-white p-3 rounded-lg shadow-md"
    >
      {content}
    </div>
  );
}

function StepSlot({ id, index, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-1 font-semibold text-gray-700">Step {index + 1}</p>
      <div
        ref={setNodeRef}
        className={`w-full h-24 border-2 border-dashed rounded-lg flex items-center justify-center p-2 transition-colors
                ${isOver ? "bg-indigo-100" : "bg-gray-200"}
                ${children ? "border-indigo-400" : "border-gray-400"}`}
      >
        {children || (
          <span className="text-sm text-gray-500">Drop Step Here</span>
        )}
      </div>
    </div>
  );
}

function UnassignedPool({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 border-dashed border-gray-300 min-h-[200px] transition-colors ${
        isOver ? "bg-gray-200" : "bg-white"
      }`}
    >
      <SortableContext items={children.map((c) => c.key)}>
        <div className="space-y-2">{children}</div>
      </SortableContext>
      {children.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-center py-10">All steps placed!</p>
        </div>
      )}
    </div>
  );
}

function WorkflowImplementation({ workflowImplementation }) {
  const { title, steps, correctOrder } = workflowImplementation;

  const stepData = useMemo(
    () => steps.map((content, index) => ({ id: `step-${index}`, content })),
    [steps]
  );

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };  

  const [unassignedSteps, setUnassignedSteps] = useState(() =>
    shuffleArray(stepData)
  );
  const [sequencedSteps, setSequencedSteps] = useState(() =>
    Array(steps.length).fill(null)
  );
  const [activeId, setActiveId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeStep = activeId ? stepData.find((s) => s.id === activeId) : null;

  function handleDragStart(event) {
    setActiveId(event.active.id);
    setFeedback("");
    setIsCorrect(null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeStepData = stepData.find((s) => s.id === active.id);
    const sourceIsUnassigned = unassignedSteps.some((s) => s.id === active.id);
    const sourceSlotIndex = sequencedSteps.findIndex(
      (s) => s && s.id === active.id
    );

    // Dropping into a slot
    if (over.id.startsWith("slot-")) {
      const targetSlotIndex = parseInt(over.id.split("-")[1], 10);
      const stepInTargetSlot = sequencedSteps[targetSlotIndex];
      const newSequencedSteps = [...sequencedSteps];
      const newUnassignedSteps = [...unassignedSteps];

      if (sourceIsUnassigned) {
        newSequencedSteps[targetSlotIndex] = activeStepData;
        const indexInUnassigned = newUnassignedSteps.findIndex(
          (s) => s.id === active.id
        );
        newUnassignedSteps.splice(indexInUnassigned, 1);
        if (stepInTargetSlot) {
          newUnassignedSteps.push(stepInTargetSlot);
        }
      } else {
        // Swapping between slots
        newSequencedSteps[targetSlotIndex] = activeStepData;
        newSequencedSteps[sourceSlotIndex] = stepInTargetSlot;
      }
      setSequencedSteps(newSequencedSteps);
      setUnassignedSteps(newUnassignedSteps);
    }
    // Dropping back to unassigned pool
    else if (over.id === "unassigned-pool" && sourceSlotIndex > -1) {
      setUnassignedSteps([...unassignedSteps, activeStepData]);
      const newSequencedSteps = [...sequencedSteps];
      newSequencedSteps[sourceSlotIndex] = null;
      setSequencedSteps(newSequencedSteps);
    }
  }

  function verifyWorkflow() {
    const userOrder = sequencedSteps.map((step) =>
      step ? parseInt(step.id.split("-")[1]) : -1
    );
    const isPerfect = userOrder.every((id, index) => id === correctOrder[index]);

    if (isPerfect) {
      setIsCorrect(true);
      setFeedback("Correct! You have sequenced the workflow perfectly.");
    } else {
      setIsCorrect(false);
      setFeedback("Not quite right. Review the steps and try to reorder them.");
    }
  }

  const allStepsPlaced = sequencedSteps.every((s) => s !== null);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-5">
      <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
      <p className="mb-4 text-[#2D2F4A]">{workflowImplementation.description}</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-2 text-center">
              Workflow Steps
            </h3>
            <UnassignedPool id="unassigned-pool">
              {unassignedSteps.map((step) => (
                <DraggableStep
                  key={step.id}
                  id={step.id}
                  content={step.content}
                />
              ))}
            </UnassignedPool>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {sequencedSteps.map((step, index) => (
              <StepSlot key={index} id={`slot-${index}`} index={index}>
                {step && (
                  <DraggableStep
                    id={step.id}
                    content={step.content}
                    isDraggable
                  />
                )}
              </StepSlot>
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeStep ? (
            <DraggableStep
              id={activeStep.id}
              content={activeStep.content}
              isOverlay
            />
          ) : null}
        </DragOverlay>

        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={verifyWorkflow}
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!allStepsPlaced}
          >
            Verify Workflow
          </button>
          {feedback && (
            <p
              className={`mt-4 text-lg font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      </DndContext>
    </div>
  );
}

export default WorkflowImplementation; 