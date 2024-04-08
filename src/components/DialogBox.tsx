import React, { useState } from "react";

import Button from "./Button";
import Modal from "./Modal";

type Props = {
  onConfirm: () => void;
  reason?: string;
  setReason?: Function;
  show: boolean;
  setShow: Function;
  loading: boolean;
  onClose: () => void;
};

const DialogBox = ({
  onConfirm,
  reason,
  setReason,
  setShow,
  show,
  loading,
  onClose,
}: Props) => {
  const [errorRequired, setErrorRequired] = useState(false);
  return (
    <Modal onClose={onClose} show={show} width={"narrow"}>
      <h3 className=" mb-2">Are you sure you want to delete this item?</h3>
      {setReason && (
        <textarea
          name=""
          id=""
          value={reason}
          onChange={(e) => setReason && setReason(e.target.value)}
          className=" h-56 w-full mb-3"
          placeholder="Reason for deletion"
        />
      )}
      {errorRequired && <p className=" mb-3 text-red-1">Reason is required!</p>}
      <div className=" flex justify-between">
        <Button appearance="default" onClick={onClose}>
          Cancel
        </Button>{" "}
        <Button
          onClick={() => {
            if (setReason && !reason) {
              setErrorRequired(true);
              return;
            }
            setErrorRequired(false);
            onConfirm();
          }}
          appearance={"primary"}
          loading={loading}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DialogBox;
