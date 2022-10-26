import HalloFace from "../assets/hallo-face.jpeg";

const Spinner = () => {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner">
        <img src={HalloFace} alt="" className="hallo-face" />
      </div>
    </div>
  );
};

export default Spinner;
