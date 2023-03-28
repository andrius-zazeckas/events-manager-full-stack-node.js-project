export type TUsers = {
  id: number;
  username: string | null;
  password: string | null;
};

export type TUserProps = { user: TUsers };
