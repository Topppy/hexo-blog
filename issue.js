const core = require('@actions/core');
const { Octokit } = require('octokit');
const Hexo = require('hexo');

const MILESTONE_PUBLISH = 'publish';

try {
    console.log(`issueUrl: ${process.env.issueUrl}`);
    // console.log(`token: ${process.env.issueToken}`);
    const issueUrl = process.env.issueUrl
    const index = issueUrl.indexOf('/repos');
    const endpoint = issueUrl.substring(index);
    const token = process.env.issueToken

    const gh = new Octokit({ auth: token });

    const hexo = new Hexo(process.cwd(), {});
    hexo.init().then(() => {
        console.log(`Converting issue ${endpoint} to Hexo post...`);
        gh.request(`GET ${endpoint}`).then((response) => {
            const { title, updated_at: date, labels, milestone, body: issueContent, comments_url } = response.data;
            console.log('title:', title);
            console.log('date:', date);
            console.log('labels:', labels);
            gh.request(`GET ${comments_url}`).then((response) => {
                const comments = response.data.map(cm => cm.body)
                const content = issueContent + '\n\r' + comments.join('\n\r')

                if (milestone.title !== MILESTONE_PUBLISH) {
                    console.log(`Issue does not have milestone ${MILESTONE_PUBLISH}`);
                } else {
                    const tags = labels.map((label) => label.name);
                    hexo.post.create({
                        title,
                        date,
                        tags,
                        content,
                    }).then(res => {
                        console.log('Done hexo post')
                    });
                }
            }).catch((reason) => {
                core.setFailed(reason);
            })
        }).catch((reason) => {
            core.setFailed(reason);
        });
    }).catch((reason) => {
        core.setFailed(reason);
    });
} catch (e) {
    core.setFailed(e);
}