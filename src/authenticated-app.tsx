import React, { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/context-data/auth-context";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

/*
 * 我们这里使用状态提升定义了一个公共的prop, 并把它层层传递给了子组件，
 * 缺点一: state definition is far away the place where usage 高耦合
 * 缺点二: 我们这里使用状态提升定义了一个公共的prop, 并把它层层传递给了子组件，(下钻)
 * */
export const AuthenticatedApp = () => {
  // 记录Drawer打开
  const [projectModalOpen, setProjectModal] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModal} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModal} />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModelOpen={projectModalOpen}
        onClose={() => setProjectModal(false)}
      ></ProjectModal>
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type={"link"} onClick={resetRoute}>
          logo
        </Button>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"layout"}>
            <Button type={"link"} onClick={logout}>
              注销
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
