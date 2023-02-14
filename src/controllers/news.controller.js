import { createService, findAllService, countNews, topNewsService } from '../services/news.service.js';

const create = async (req, res) => {
    try {

        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: "Submit all fields for registration." });
        };

        const news = await createService({
            title,
            text,
            banner,
            user: { _id: req.userId }
        });

        if (!news) {
            res.status(400).send({ message: 'Error creating News.' })
        }

        res.status(201).send(news);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(limit, offset);
        const next = offset + limit;
        const currentUrl = req.baseUrl;
        const total = await countNews();
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.lenght === 0) {
            return res.status(400).send({ message: 'No registered news.' });
        };

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar
            })),
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    };
}

const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(400).send({ message: 'There is no registered post.' });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar
            }
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default { create, findAll, topNews };
