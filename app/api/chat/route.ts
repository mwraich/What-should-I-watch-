import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

type Movie = {
	title: string;
	description: string;
};
export async function POST(req: Request) {
	const { genre } = await req.json();
	console.log(genre);
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `Act as a movie recommendation API and ONLY in JSON format return me a list of 10 movies to watch from the genre ${genre}, in a JSON format of [{title: '', description: ''}]`,
			},
		],
		response_format: { type: 'json_object' },
		model: 'gpt-4o-mini',
	});

	console.log(completion.choices[0].message.content);
	try {
		const movieList: Movie[] = JSON.parse(
			completion.choices[0].message.content,
		);
		return NextResponse.json({ movieList });
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			error: 'An error occurred while parsing the response from the OpenAI API',
		});
	}
}
