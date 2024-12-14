function Snackbar({ open, text, handleClose, variant }) {
  const variants = {
    success: 'bg-green-500',
    error: 'bg-red-400',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    open && (
      <div
        className={`${variants[variant]} h-30 flex min-w-[320px] items-center truncate whitespace-nowrap rounded-lg px-3.5 py-3 text-sm font-semibold text-white shadow-md`}
      >
        <span>{text}</span>
        <button
          type="button"
          className="bg-transparent !p-0 text-current underline"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    )
  );
}

export default Snackbar;
