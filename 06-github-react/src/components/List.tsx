interface ListProps {
  items: string[] | undefined;
}
function List({ items }: ListProps) {
  return (
    <>
      <ol
        id='container-repo'
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: '0.3rem',
          maxHeight: '430px',
        }}
      >
        {items?.map((item) => (
          <li key={item}
          style={{   
            width: '320px',
          }}>{item}</li>
        ))}
      </ol>
    </>
  );
}

export default List;
