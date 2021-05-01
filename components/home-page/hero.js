import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/profile.jpeg'
          alt='An image showing yous'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Minh Chau Pham</h1>
      <p>
        I blog about web development <br />- especially frameworks I used.
      </p>
    </section>
  );
}

export default Hero;
