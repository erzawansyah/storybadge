import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            {/* Backdrop */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/80 duration-300 ease-out data-[closed]:opacity-0"
            />

            {/* Dialog Content */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="relative max-w-lg w-full rounded-lg p-6 text-white shadow-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {/* Close Button */}
                    <button
                        type='button'
                        onClick={onClose}
                        className="absolute top-2 right-2 text-2xl text-gray-200 hover:text-white transition"
                    >
                        &times;
                    </button>
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default Modal;
