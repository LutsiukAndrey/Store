"use client";

import { Modal } from "@/components/ui/modal";

const SetupPage = () => {
  return (
    <div className="p-4">
      <p>dssdfgg</p>
      <Modal title="test" description="hrllo" isOpen onClose={() => {}}>
        Children
      </Modal>
    </div>
  );
};
export default SetupPage;
