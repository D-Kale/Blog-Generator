export const ImageControls = ({ styles, onStyleChange }: { styles: string, onStyleChange: (s: string) => void}) => {
    return (
        <div className="flex flex-col gap-6 p-2 h-full overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                ImageControl
            </div>
        </div>
    )
}