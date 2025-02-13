import React from "react";

interface Props {
  params: { code: string };
}

const DeviceDetailPage = ({ params: { code } }: Props) => {
  return <div>DeviceDetailPage {code}</div>;
};

export default DeviceDetailPage;
