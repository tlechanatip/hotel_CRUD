const FlashMessage = ({ flash }) => {
    if (!flash || (!flash.success && !flash.error)) return null;

    return (
        <div
            className={`mb-4 rounded border p-4 ${flash.success ? 'bg-green-500' : 'bg-red-500'}`}>
            <p className="text-white">{flash.success || flash.error}</p>
        </div>
    );
};

export default FlashMessage;
