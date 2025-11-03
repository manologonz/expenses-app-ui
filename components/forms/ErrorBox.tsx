const ErrorBox: React.FC<{ errors: string[] }> = ({ errors }) => {
    return (
        <ul className="w-full text-[9px] text-red list list-disc list-inside px-3 py-2 mt-1 bg-red-100 rounded-[5px] border border-red-400">
            {errors.map((error, index) => (
                <li key={index} className="text-red-400 font-bold">
                    {error}
                </li>
            ))}
        </ul>
    );
};

export default ErrorBox;
