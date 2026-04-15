"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./3d-card";

let interval: any;

type Card = {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 12;
  const SCALE_FACTOR = scaleFactor || 0.05;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const lastCard = newArray.pop();
        if (lastCard) newArray.unshift(lastCard);
        return newArray;
      });
    }, 5000);
  };

  const handleFlip = () => {
    clearInterval(interval);
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const lastCard = newArray.pop();
      if (lastCard) newArray.unshift(lastCard);
      return newArray;
    });
    startFlipping();
  };

  return (
    <div className="relative h-[25rem] w-[24rem]" onClick={handleFlip}>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-[25rem] w-[24rem] rounded-3xl p-6 border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.45)] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              x: index * 20,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <CardContainer className="inter-var w-full h-full p-0 m-0 cursor-pointer">
              <CardBody className="bg-transparent relative group/card w-full h-full rounded-xl p-1 flex flex-col justify-center">
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  {/* Заголовок */}
                  <CardItem
                    translateZ="40"
                    className="w-full text-3xl font-semibold text-white tracking-tight"
                  >
                    {card.title}
                  </CardItem>

                  {/* Иконка */}
                  <CardItem
                    translateZ="70"
                    className="w-20 h-20 bg-black/40 border border-white/15 rounded-3xl flex items-center justify-center mx-auto"
                  >
                    <div className="scale-150">
                      {card.icon}
                    </div>
                  </CardItem>

                  {/* Описание */}
                  <CardItem
                    as="p"
                    translateZ="50"
                    className="w-full text-lg leading-relaxed text-neutral-200 max-w-[28ch] mx-auto"
                  >
                    {card.desc}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        );
      })}
    </div>
  );
};