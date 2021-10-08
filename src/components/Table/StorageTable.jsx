import React, { useMemo } from 'react';
import faker from "faker/locale/ko";
import Table from "./Table";

faker.seed(100);


const StorageTable = () => {
  const columns = useMemo(
    () => 
      Array(12)
        .fill()
        .map((friend, idx) => Object.assign({}, friend = {Header : `Lane${idx + 1}`, accessor: `Lane${idx + 1}`})),
    []
  );

  const data = useMemo(
    () =>
      Array(2)
        .fill()       // 모두 undefined 로 채워짐
        .map(() => ({
          Lane1: true,
          Lane2: true,
          Lane3: true,
          Lane4: false,
          Lane5: true,
          Lane6: true,
          Lane7: false,
          Lane8: false,
          Lane9: true,
          Lane10: true,
          Lane11: true,
          Lane12: true,
        })),
    []
  );

  return <Table columns={columns} data={data} />;
};

export default StorageTable;