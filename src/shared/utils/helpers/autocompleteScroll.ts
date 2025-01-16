type Props = {
  page: number;
  event: React.SyntheticEvent;
  setPage: (page: number | ((prevPage: number) => number)) => any;
  dataQuery: any;
};

export const handleScroll = ({ page, event, setPage, dataQuery }: Props) => {
  const listboxNode = event.currentTarget as HTMLElement;

  if (
    listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight &&
    !dataQuery.isLoading
  ) {
    const totalPages = dataQuery.data
      ? Math.ceil(dataQuery.data.count / 20)
      : 0;

    if (page < totalPages) {
      setPage((prevPage: number) => prevPage + 1);
    }
  }
};
