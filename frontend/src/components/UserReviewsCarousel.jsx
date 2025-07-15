import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // senin kullandığın slider
import axios from "axios";

const positiveWords = [
  "good",
  "perfect",
  "great",
  "excellent",
  "nice",
  "awesome",
  "love",
  "happy",
  "best",
];

const curseWords = [
  "badword1",
  "badword2",
  "fuck",
  "shit",
  "damn",
  "ass",
  // burada gerçek küfürleri ekle
];

// Küfür kontrol fonksiyonu (basit, küçük harfe çevirip kontrol)
const hasCurseWords = (text) => {
  const lowerText = text.toLowerCase();
  return curseWords.some((cw) => lowerText.includes(cw));
};

// Pozitif kelime kontrol fonksiyonu
const hasPositiveWords = (text) => {
  const lowerText = text.toLowerCase();
  return positiveWords.some((pw) => lowerText.includes(pw));
};

const UserReviewsCarousel = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default mesajlar
  const defaultReviews = [
    {
      text: "This app changed the way I handle my money. I finally feel in control of my finances.",
      author: "Alex J., Freelance Designer",
    },
    {
      text: "The intuitive dashboard and detailed reports make budgeting simple and enjoyable.",
      author: "Maya S., Small Business Owner",
    },
    {
      text: "A must-have tool for anyone serious about financial planning and success.",
      author: "Liam K., Software Engineer",
    },
    {
      text: "Excellent customer support and constant updates keep me confident using this app.",
      author: "Sara W., Freelancer",
    },
  ];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/reports");

        const filtered = res.data.filter((r) => {
          const text =
            typeof r.message === "string" ? r.message : r.message || "";
          return !hasCurseWords(text) && hasPositiveWords(text);
        });

        setReports(filtered);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const reviewsToShow = reports.length > 0 ? reports : defaultReviews;

  return (
    <section className="px-6 py-16 bg-white max-w-4xl mx-auto h-[50vh] mt-[160px]">
      <h3 className="text-3xl font-bold text-center mb-12 text-indigo-800">
        What Our Users Say
      </h3>
      {loading ? (
        <p className="text-center">Loading reviews...</p>
      ) : (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={false}
        >
          {reviewsToShow.map((review, idx) => {
            const text =
              typeof review.message === "string"
                ? review.message
                : review.message || review.text || "";
            const author =
              review.user?.username || review.author || "Anonymous";

            return (
              <div
                key={idx}
                className="bg-indigo-50 p-8 rounded-xl shadow-md text-center mx-4"
              >
                <p className="italic text-lg mb-6 text-gray-700">
                  &ldquo;{text}&rdquo;
                </p>
                <h4 className="font-semibold text-indigo-700">{author}</h4>
              </div>
            );
          })}
        </Slider>
      )}
    </section>
  );
};

export default UserReviewsCarousel;
