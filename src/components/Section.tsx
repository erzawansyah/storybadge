import { NextPage } from "next";

interface SectionProps {
    title: string;
    description: string | React.ReactNode;
    titleColor?: string;
    children?: React.ReactNode;
}

const Section: NextPage<SectionProps> = ({
    title,
    description,
    titleColor,
    children,
}) => {
    titleColor = titleColor || 'gradient-1';


    return (
        <div className="flex flex-col items-center justify-center py-16">
            {/* Header */}
            <h1 className={`text-4xl md:text-5xl text-center font-extrabold pb-1.5 mb-4 text-transparent bg-clip-text ${titleColor}`}>
                {title}
            </h1>
            {
                typeof description === 'string' ?
                    <p className="text-gray-300 text-base md:text-lg mb-8 text-center max-w-3xl">
                        {description}
                    </p> :
                    <div
                        className="mb-8 max-w-3xl"
                    >
                        {description}
                    </div>
            }
            {children}
        </div>
    );
}

export default Section;
