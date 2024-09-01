import { useState } from "react";
import Avatar from "../components/Avatar";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Row from "../ui/Row";
import styles from "./Profile.module.css";

import { MdCreate } from "react-icons/md";
import { Textarea } from "../ui/TextArea";
import Modal from "../ui/Modal";
import ChangePP from "../ui/ChangePP";
import { useUser } from "../context/UserContext";
import {
  changePasswordApi,
  editBioApi,
  editSkillApi,
  visibilityApi,
} from "../services/api/api";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

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

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

function Profile() {
  const { user, prozVerify, setProzVerify } = useUser();
  const [bio, setBio] = useState(user.bio);
  const [editBio, setEditBio] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState("");
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const handleEditBio = (bio) => {
    setEditBio(false);
    setBio(bio);
    editBioApi(bio, prozVerify);
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      editSkillApi(newSkill.trimEnd(), prozVerify);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  async function handleChangePassword(data) {
    changePasswordApi(data, prozVerify)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Password changed successfully.");
          localStorage.setItem("prozverify", res.data.token);
          setProzVerify(res.data.token);
          // window.location.reload(true);
        } else {
          toast.error("There was some error try again");
        }
      })
      .catch((err) => {
        toast.error(err.message || "An error occurred.");
      });

    reset();
  }

  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <Avatar src={user.photo} size={"large"} name={"Jessica Doe"} />
        <p className={styles.name}>{`${user.firstName} ${user.lastName}`}</p>
        <p className={styles.mail}>{user.email}</p>
        <Modal>
          <Modal.Open opens="upload-pp">
            <Button size={"medium"} variation={"secondary"}>
              Upload profile picture
            </Button>
          </Modal.Open>
          <Modal.Window name={"upload-pp"}>
            <ChangePP />
          </Modal.Window>
        </Modal>
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
                onClick={() => handleEditBio(bio)}
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
          <form
            className={styles["c-p"]}
            onSubmit={handleSubmit(handleChangePassword)}
          >
            <Row type={"vertical"}>
              <Input
                placeholder="Current password"
                type="text"
                id={"currentPassword"}
                {...register("currentPassword", {
                  required: "This field is required!",
                })}
              />
              {errors?.currentPassword?.message && (
                <Error>{errors?.currentPassword?.message}</Error>
              )}
              <Input
                placeholder="New password"
                type="text"
                id={"newPassword"}
                {...register("newPassword", {
                  required: "This field is required!",
                })}
              />
              {errors?.newPassword?.message && (
                <Error>{errors?.newPassword?.message}</Error>
              )}
              <Input
                placeholder="Confirm new password"
                type="text"
                id={"confirmPassword"}
                {...register("confirmPassword", {
                  required: "This field is required!",
                  validate: (value) =>
                    value === getValues().newPassword ||
                    "password and confirm password do not match!",
                })}
              />
              {errors?.confirmPassword?.message && (
                <Error>{errors?.confirmPassword?.message}</Error>
              )}
            </Row>
            <div className={styles["c-p-btn"]}>
              <Button size={"medium"} variation={"secondary"}>
                Change password
              </Button>
            </div>
          </form>
        </div>
      </Row>
    </div>
  );
}

const SwitchComponent = () => {
  const { user, prozVerify } = useUser();
  const [isPublic, setIsPublic] = useState(user.profile);

  const toggleSwitch = () => {
    setIsPublic(!isPublic);
    visibilityApi(prozVerify);
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
