import {
	adjectives,
	Config,
	uniqueUsernameGenerator,
} from "unique-username-generator";

const marvelCharacters = [
	"IronMan",
	"CaptainAmerica",
	"Thor",
	"Hulk",
	"BlackWidow",
	"Hawkeye",
	"SpiderMan",
	"DoctorStrange",
	"BlackPanther",
	"CaptainMarvel",
	"ScarletWitch",
	"Vision",
	"AntMan",
	"Falcon",
	"WinterSoldier",
	"StarLord",
	"Gamora",
	"Rocket",
	"Groot",
	"Loki",
	"Thanos",
	"Ultron",
	"NickFury",
	"Deadpool",
	"ShangChi",
	"MoonKnight",
];

export const generateAnonymousUsername = (): string => {
	const config: Config = {
		dictionaries: [adjectives, marvelCharacters],
		separator: "-",
		length: 50,
		style: "lowerCase",
	};

	const username =  uniqueUsernameGenerator(config);
	const randomNumber = Math.floor(Math.random() * 900) + 100;

    return username + "-" + randomNumber;
};
