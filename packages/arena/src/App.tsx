import { Suspense, useContext, useEffect } from 'react';

import AbilityBar from './components/UI/AbilityBar';
import { AppContext } from './providers/GameSettingsProvider';
import { Leva } from 'leva';
import Scenario from './components/Scenario';

export default function App() {
    const {
        state: { USE_FULL_SCREEN, DEBUG_APP },
    } = useContext(AppContext);

    useEffect(() => {
        if (USE_FULL_SCREEN) {
            const handlePermission = () => {
                const permissionPromise =
                    document.documentElement.requestFullscreen();
                if (permissionPromise) {
                    permissionPromise
                        .then(() => {})
                        .catch((error) => {
                            console.error('permission declined:', error);
                        });
                }
            };
            document.documentElement.addEventListener(
                'click',
                handlePermission
            );
            return () => {
                document.documentElement.removeEventListener(
                    'click',
                    handlePermission
                );
            };
        }
    }, []);

    return (
        <>
            <Leva isRoot collapsed hidden={!DEBUG_APP} />
            <AbilityBar />
            <Suspense
                fallback={
                    <div>
                        <div>Loading...</div>
                        <div></div>
                    </div>
                }
            >
                <Scenario />
            </Suspense>
        </>
    );
}
