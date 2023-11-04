// ResumeSection.js
function ResumeSection() {
  return (
    <>
    <section className="intro">
        <h1>Hi, I'm <span className="name">Sam Roy</span></h1>
        <p className="title">Head of Technology</p>
        <div className="buttons">
          <button className="btn">Download Resume</button>
          <button className="btn btn-outline">View Portfolio</button>
        </div>
      </section>
      <section className="about">
        <h2>About</h2>
        <p>...</p>
        <div className="skills">
          <div className="skill">
            <label>SW Development</label>
            <progress value="80" max="100"></progress>
          </div>
          <div className="skill">
            <label>IT Management</label>
            <progress value="100" max="100"></progress>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResumeSection;
