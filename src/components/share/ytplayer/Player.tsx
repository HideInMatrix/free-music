import { AudioProvider } from "../player/AudioProvider"
import { PlayerControls } from "./PlayerControls"

export const Player = () => {
    return (
        <AudioProvider>
            <div className="items-center justify-start flex player px-4 py-2 mg:py-0 mg:px-2 shadow-lg border-t sticky bottom-0 bg-white">

                <PlayerControls />
            </div>
        </AudioProvider>
    )
}