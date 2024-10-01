import Image from "next/image";

export default function Home() {
  return (
    <div className="my-12 md:my-24 w-full flex flex-col items-center gap-y-16 px-4">
      <article className="prose prose-slate lg:prose-lg">
        <h1>Harry Potter</h1>
        <p>
          Harry Potter is a series of seven fantasy novels written by British
          author J. K. Rowling. The novels chronicle the lives of a young
          wizard, Harry Potter, and his friends, Hermione Granger and Ron
          Weasley, all of whom are students at Hogwarts School of Witchcraft and
          Wizardry. The main story arc concerns Harrys conflict with Lord
          Voldemort, a dark wizard who intends to become immortal, overthrow the
          wizard governing body known as the Ministry of Magic, and subjugate
          all wizards and Muggles (non-magical people). The series was
          originally published in English by Bloomsbury in the United Kingdom
          and Scholastic Press in the United States. A series of many genres,
          including fantasy, drama, coming-of-age fiction, and the British
          school story (which includes elements of mystery, thriller, adventure,
          horror, and romance), the world of Harry Potter explores numerous
          themes and includes many cultural meanings and references.[1] Major
          themes in the series include prejudice, corruption, madness, love, and
          death.[2][3] Since the release of the first novel, Harry Potter and
          the Philosophers Stone, on 26 June 1997, the books have found immense
          popularity, positive reviews, and commercial success worldwide. They
          have attracted a wide adult audience as well as younger readers and
          are widely considered cornerstones of modern literature.[4][5] As of
          February 2023, the books have sold more than 600 million copies
          worldwide, making them the best-selling book series in history, and
          have been available in 85 languages.[6] The last four books
          consecutively set records as the fastest-selling books in history,
          with the final instalment selling roughly 2.7 million copies in the
          United Kingdom and 8.3 million copies in the United States within
          twenty-four hours of its release. Warner Bros. Pictures adapted the
          original seven books into an eight-part namesake film series. In 2016,
          the total value of the Harry Potter franchise was estimated at $25
          billion,[7] making it one of the highest-grossing media franchises of
          all time. Harry Potter and the Cursed Child is a play based on a story
          co-written by Rowling. The success of the books and films has allowed
          the Harry Potter franchise to expand with numerous derivative works, a
          travelling exhibition that premiered in Chicago in 2009, a studio tour
          in London that opened in 2012, a digital platform on which J. K.
          Rowling updates the series with new information and insight, and a
          trilogy of spin-off films premiering in November 2016 with Fantastic
          Beasts and Where to Find Them, among many other developments. Themed
          attractions, collectively known as The Wizarding World of Harry
          Potter, have been built at several Universal Destinations &
          Experiences amusement parks around the world.
        </p>
      </article>
      <div className="relative">
        <div className="flex items-center gap-x-2 px-2 z-10 bg-white relative">
          <Image
            src="/paperly.svg"
            width={20}
            height={20}
            alt="logo"
            className="opacity-40"
          />
          <p className="font-medium opacity-40">Made with Paperly</p>
        </div>
        <div className="absolute w-[120%]  -left-[10%] top-1/2 bg-neutral-200 h-[2px] z-0" />
      </div>
    </div>
  );
}
