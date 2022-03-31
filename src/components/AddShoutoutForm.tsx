import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { storage } from "../firebaseConfig";
import Shoutout from "../model/Shoutout";
import "./AddShoutoutForm.css";

interface Props {
  onAddShoutout: (shoutout: Shoutout) => void;
  name: string;
}

const AddShoutoutForm = ({ onAddShoutout, name }: Props) => {
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState(name);
  const [from, setFrom] = useState(user?.displayName || "");
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const shoutout: Shoutout = {
      to,
      from,
      text,
      ...(user?.photoURL ? { avatar: user?.photoURL } : {}),
    };
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0];
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          shoutout.image = url;
          onAddShoutout(shoutout);
        });
      });
    } else {
      onAddShoutout(shoutout);
    }
    setTo("");
    setText("");
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      className="AddShoutoutForm"
      onSubmit={(e) => submitHandler(e)}
    >
      <h2>Leave a Shout Out</h2>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        disabled
        onChange={(e) => setFrom(e.target.value)}
      />
      <label htmlFor="text">Shout Out</label>
      <textarea
        name="text"
        id="text"
        cols={30}
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input ref={fileInputRef} type="file" className="file" />
      <button>Submit Shout Out</button>
    </form>
  );
};

export default AddShoutoutForm;
