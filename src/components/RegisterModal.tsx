import Register from "./Register";
import "./Auth.css";

type Props = {
  onClose: () => void;
};

const RegisterModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <Register onBackToLogin={onClose} />
      </div>
    </div>
  );
};

export default RegisterModal;
