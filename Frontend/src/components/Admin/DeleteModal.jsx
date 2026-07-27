import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteProduct } from "../../services/productService";
import { useNotifications } from "../UI/NotificationProvider";

import "./DeleteModal.css";

export default function DeleteModal({

    open,

    product,

    onClose,

    onDeleted,

}) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const { addNotification } = useNotifications();

    if (!open || !product) return null;

    const handleDelete = async () => {
        if (deleting) return;

        setDeleting(true);
        setError("");

        try {

            await deleteProduct(product._id);
            addNotification("Product deleted successfully.", "success");
            await Promise.resolve(onDeleted());

            onClose();

        }

        catch (error) {

            if (!error.response) {
                setError("Network connection lost. Please try again.");
            } else if (error.response.status >= 500) {
                setError("Product could not be deleted. Please try again.");
            } else {
                setError("Product could not be deleted.");
            }

        }

        finally {

            setDeleting(false);

        }

    };

    return (

        <>

            <div

                className="delete-overlay"

                onClick={deleting ? undefined : onClose}

            />

            <div className="delete-modal">

                <div className="delete-header">

                    <Trash2
                        size={42}
                        color="#d32f2f"
                    />

                    <button

                        className="close-btn"

                        onClick={onClose}

                        disabled={deleting}

                    >

                        <X size={20} />

                    </button>

                </div>

                <h2>

                    Delete Product?

                </h2>

                <p>

                    Are you sure you want to delete

                    <strong>

                        {" "}

                        {product.name}

                    </strong>

                    ?

                </p>

                <p className="warning">

                    This action cannot be undone.

                </p>

                {error && (
                    <p className="delete-error">
                        {error}
                    </p>
                )}

                <div className="delete-actions">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                        disabled={deleting}

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-btn"

                        onClick={handleDelete}

                        disabled={deleting}

                    >

                        {deleting ? "Deleting..." : "Delete"}

                    </button>

                </div>

            </div>

        </>

    );

}
