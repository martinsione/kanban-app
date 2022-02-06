interface Assignee {
  //   name: string;
  avatar: string;
}

export interface Card {
  id: string;
  priority: number;
  title: string;
  chat: number;
  attachment: number;
  assignees: Assignee[];
}

export interface Board {
  name: string;
  cards: Card[];
}
