const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const route = require('koa-route');
const queries = require('./lib/db/queries/events');
const broker = require('./lib/ampq');

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

app.use(route.post('/api/event', async (ctx) => {
  try {
    const { metadata, metric } = ctx.request.body;
    const event = await queries.upsertEvent(metadata);
    // TODO:
    // const added = await queries.addMetric(metric);
    ctx.status = 201;
    ctx.body = {
      status: 'Success.',
      data: event
    };

    if(metadata.completed) {
      // TODO: Send metric via message broker
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: err.message || 'Sorry, an error has occurred.',
      data: null
    };
  }
}));


app.use(route.get('/api/event/:tid', async (ctx, tid) => {
  try {
    const event = await queries.getEventById(tid);
    if (event.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'Success.',
        data: event
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'Something went wrong.',
        data: null
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: err.message || 'Sorry, an error has occurred.',
      data: null
    };
  }
}));


module.exports = app;
