module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Events', [
        {
            username: "John Doe3",
            title: "Hack UMASS",
            desc: "Enroll in HackUmass, 3 day coding challenge!",
            category: "academic",
            date: "11/27/2024",
            cover: "./mockImages/hackUMASS.png",
            time: "12:45 pm to 9:00 pm",
            where: "integrated learning center lobby"
        },
        {
            username: "John Doe",
            title: "Boba Night",
            desc: "Boba night at ten one",
            category: "social",
            date: "11/17/2024",
            cover: "./mockImages/tenOneLogo.png",
            time: "7:00 pm to 9:00 pm",
            where: "TenOne Amherst"
        },
        {
            username: "John Doe2",
            title: "Guac and Talk",
            desc: "chatting with guacemole",
            category: "social",
            date: "11/23/2024",
            cover: "./mockImages/guacAndTalk.png",
            time: "7:00 pm to 9:00 pm",
            where: "student union ballroom"
            
        },
      ], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Events', null, {});
  },
};
