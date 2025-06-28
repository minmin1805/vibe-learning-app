import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab">
            {children}
        </div>
    );
}

function Droppable({ id, children }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg min-h-[100px] border-2 border-dashed border-gray-300">
            <h3 className="font-bold text-lg mb-2">{id}</h3>
            <div className="flex flex-wrap">
                {children}
            </div>
        </div>
    );
}


function InteractiveAlgorithmAnalysis({ analysisData }) {
    const { title, algorithms, characteristics, correctMatches } = analysisData;
    const [assignments, setAssignments] = useState(
        Object.fromEntries(algorithms.map(algo => [algo, []]))
    );
    const [unassigned, setUnassigned] = useState(characteristics);
    const [feedback, setFeedback] = useState(null);

    const handleDragEnd = (event) => {
        setFeedback(null); // Reset feedback on new drag
        const { over, active } = event;

        if (over) {
            const characteristic = active.id;
            const targetId = over.id;

            // Optimistically update UI
            const newAssignments = { ...assignments };
            let newUnassigned = [...unassigned];

            // Remove from previous location
            newUnassigned = newUnassigned.filter(c => c !== characteristic);
            for (const algo in newAssignments) {
                newAssignments[algo] = newAssignments[algo].filter(c => c !== characteristic);
            }

            // Add to new location
            if (algorithms.includes(targetId)) {
                newAssignments[targetId].push(characteristic);
            } else { // Dropped in the pool or somewhere else
                newUnassigned.push(characteristic);
            }
            
            setAssignments(newAssignments);
            setUnassigned(newUnassigned);
        }
    }

    const checkAnswers = () => {
        const newFeedback = {};
        for (const algo in assignments) {
            newFeedback[algo] = {};
            const userChars = assignments[algo];
            
            userChars.forEach(char => {
                const isCorrect = correctMatches[char]?.includes(algo);
                newFeedback[algo][char] = isCorrect ? 'correct' : 'incorrect';
            })
        }
        setFeedback(newFeedback);
    };

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <div className="p-6 bg-[#F9FAFC] rounded-2xl shadow-xl my-8">
                <h2 className="text-2xl font-bold mb-1 text-gray-800">{title}</h2>
                <p className="text-[#2D2F4A] mb-6">Analyze the relationship between these algorithms by connecting them to their characteristics:</p>

                {/* Characteristics Pool */}
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200 mb-8">
                     <Droppable id="characteristics-pool">
                        <div className="flex flex-wrap min-h-[40px]">
                            {unassigned.map(char => (
                                <Draggable key={char} id={char}>
                                    <div className="bg-blue-500 text-white p-2 rounded-lg m-1">{char}</div>
                                </Draggable>
                            ))}
                        </div>
                    </Droppable>
                </div>


                {/* Algorithm Buckets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {algorithms.map(algo => (
                        <Droppable key={algo} id={algo}>
                             <div className="flex flex-wrap">
                                {assignments[algo].map(char => {
                                    const feedbackState = feedback?.[algo]?.[char];
                                    let colorClass = 'bg-blue-500'; // default
                                    if (feedbackState === 'correct') colorClass = 'bg-green-500';
                                    if (feedbackState === 'incorrect') colorClass = 'bg-red-500';

                                    return (
                                        <Draggable key={char} id={char}>
                                            <div className={`${colorClass} text-white p-2 rounded-lg m-1`}>{char}</div>
                                        </Draggable>
                                    );
                                })}
                            </div>
                        </Droppable>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={checkAnswers}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                    >
                        Analyze Relationships
                    </button>
                </div>
            </div>
        </DndContext>
    )
}

export default InteractiveAlgorithmAnalysis; 