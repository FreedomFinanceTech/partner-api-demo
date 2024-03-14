import {useEffect, useRef} from "react";
import {useEmbeddedStageStore} from "@/app/state/embedded_stages";

const EmbeddedStageNav = ({canGoBack, goBackCount = 1}: { canGoBack: boolean, goBackCount?: number }) => {
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const continueRef = useRef(null);
    const backRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const isFormControlFocused = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

            if (!isFormControlFocused) {
                if (event.key === 'ArrowRight') {
                    continueRef?.current?.click();
                } else if (event.key === 'ArrowLeft') {
                    backRef?.current?.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (<div className="flex justify-between">
        {(canGoBack) &&
            <input
                ref={backRef}
                className="bg-amber-700 hover:bg-amber-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Back"
                onClick={() => {
                    setCurrentStage(savedStage - goBackCount);
                }}
            />
        }
        <input
            ref={continueRef}
            className="bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            value={"Continue"}
        />
    </div>)
}

export default EmbeddedStageNav