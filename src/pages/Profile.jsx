import { Switch } from "@headlessui/react";
import { useState } from "react";
import Avatar from "../components/Avatar";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Row from "../ui/Row";
import styles from "./Profile.module.css";

import { MdCreate } from "react-icons/md";
import { Textarea } from "../ui/TextArea";

const data = {
  bio: "Headless UI does not strictly require Tailwind CSS to function. However, Headless UI components are designed to integrate seamlessly with Tailwind CSS, making it easier to style and customize them. If you choose to use Headless UI without Tailwind CSS, you'll need to provide your own styles.",

  skill: [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "C++",
    "React",
    "MongoDB",
    "Sql",
    "MySQL",
    "Rest API",
    "Node.js",
  ],

  visibility: true,
};

function Profile() {
  const [bio, setBio] = useState(data.bio);
  const [editBio, setEditBio] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [skills, setSkills] = useState(data.skill);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  function handleChangePassword() {}
  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <Avatar src={"/images/z.jpg"} size={"large"} name={"Jessica Doe"} />
        <p className={styles.name}>Jessica Doe</p>
        <p className={styles.mail}>jessicadoe123@gmail.com</p>
        <Button size={"medium"} variation={"secondary"}>
          Upload profile picture
        </Button>
      </div>

      <Row type={"vertical"} className={styles.right}>
        <div className={styles["r-b"]}>
          <h2 className={styles.heading}>Bio</h2>
          <div className={styles["bio-edit"]}>
            {editBio ? (
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            ) : (
              <p>{bio}</p>
            )}

            {editBio ? (
              <Button
                size={"small"}
                variation={"secondary"}
                onClick={() => setEditBio(false)}
              >
                Edit
              </Button>
            ) : (
              <div>
                <MdCreate
                  size={"2rem"}
                  onClick={() => setEditBio(true)}
                  cursor={"pointer"}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles["r-b"]}>
          <h2 className={styles.heading}>Skills</h2>
          <div className={styles["bio-edit"]}>
            {!editSkills && (
              <div className={styles["skill-list"]}>
                {skills.map((skill) => (
                  <p key={skill} className={styles["skill-tab"]}>
                    {skill}
                  </p>
                ))}
              </div>
            )}

            {editSkills && (
              <div className={styles["skill-list"]}>
                {skills.map((skill) => (
                  <div key={skill} className={styles["skill-pill"]}>
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className={styles["remove-btn"]}
                    >
                      <span>x</span>
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  // placeholder="Add new skill"
                  className={styles["skill-input"]}
                />
              </div>
            )}

            {editSkills ? (
              <Button
                size={"small"}
                variation={"secondary"}
                onClick={() => setEditSkills(false)}
              >
                Edit
              </Button>
            ) : (
              <div>
                <MdCreate
                  size={"2rem"}
                  onClick={() => setEditSkills(true)}
                  cursor={"pointer"}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles["r-b"]}>
          <h2 className={styles.heading}>Profile visibility</h2>
          <div>
            <SwitchComponent />
          </div>
        </div>
        <div className={styles["r-b"]}>
          <h2 className={styles.heading}>Change password</h2>
          <div className={styles["c-p"]}>
            <Row type={"vertical"}>
              <Input placeholder="Current password" type="text" />
              <Input placeholder="New password" type="text" />
              <Input placeholder="Confirm new password" type="text" />
            </Row>
            <div className={styles["c-p-btn"]}>
              <Button
                size={"medium"}
                variation={"secondary"}
                onClick={() => handleChangePassword()}
              >
                Change password
              </Button>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}

const SwitchComponent = () => {
  const [isPublic, setIsPublic] = useState(data.visibility);

  const toggleSwitch = () => {
    setIsPublic(!isPublic);
  };

  return (
    <div className={styles["switch-container"]}>
      <span className={styles["switch-label"]}>
        {isPublic ? "Public" : "Private"}
      </span>
      <div
        className={`${styles.switch} ${!isPublic && styles["switch-on"]}`}
        onClick={toggleSwitch}
      >
        <div className={styles["switch-handle"]} />
      </div>
    </div>
  );
};

export default Profile;
