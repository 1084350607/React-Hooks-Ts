import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/http-type/project";
import { useUsers } from "utils/http-type/users";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, Row } from "components/lib";

export const ProjectListScreen = () => {
  const { open } = useProjectModal();
  // 参数
  const [param, setParam] = useProjectsSearchParams();
  // projects
  let { isLoading, error, data: list, reloading } = useProjects(
    useDebounce(param, 200)
  );
  // users
  let { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        reloading={reloading}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
