import React, { useState, useEffect, createContext, useContext } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

function Toast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (event) => {
            setToasts((prev) => [...prev, event.detail]);
            setTimeout(() => {
                setToasts((prev) => prev.slice(1));
            }, 3000);
        };
        window.addEventListener("toast", handleToast);
        return () => window.removeEventListener("toast", handleToast);
    }, []);

    return (
        <div className="fixed top-5 right-5 space-y-2 z-50">
            {toasts.map((msg, idx) => (
                <div key={idx} className="bg-gray-800 text-white px-4 py-2 rounded shadow">
                    {msg}
                </div>
            ))}
        </div>
    );
}

export const triggerToast = (msg) => {
    window.dispatchEvent(new CustomEvent("toast", { detail: msg }));
};

export default Toast;
