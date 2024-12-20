export const feedbackSelect = {
  id: true,
  title: true,
  description: true,
};

export const feedbackRelationSelect = {
  ...feedbackSelect,
  upvotes: {
    select: {
      id: true,
    },
  },
  author: {
    select: {
      email: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  status: {
    select: {
      id: true,
      name: true,
    },
  },
};
