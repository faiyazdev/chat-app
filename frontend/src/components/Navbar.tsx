import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { useChatStore } from "../store/useChatStore";
function Navbar() {
  const getUsers = useChatStore((state) => state.getUsers);
  return (
    <header>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
      <button onClick={() => getUsers()}>Get Users</button>
    </header>
  );
}

export default Navbar;
