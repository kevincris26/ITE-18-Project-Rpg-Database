import Link from 'next/link';



const Rpgs = ({ rpgs }) => {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {rpgs &&
          rpgs.data.map((rpg) => {
            return (
              <li key={rpg.id}>
                <Link href={`rpg/` + rpg.attributes.slug}>
                  {rpg.attributes.title}
                </Link>
             </li>
            );
          })}
      </ul>
    </>
  );
};

export default Rpgs;

