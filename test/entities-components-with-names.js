var EntityManager = require('../lib/EntityManager.js');
var Transform     = require('../lib/Transform.js');

var test = require('tape');

test('(with names) Adding components to entity and querying', function(t) {
  t.plan(5);

  var entities = new EntityManager();
  function C() { }
  C.__name = 'myC';
  function D() { }
  D.__name = 'myD';

  var entity = entities.createEntity();

  entities.entityAddComponent(entity, C);
  t.ok(entity.myC instanceof C, 'added');
  t.deepEqual(entities.queryComponents([C]), [entity]);
  entities.entityAddComponent(entity, C);
  t.deepEqual(entities.queryComponents([C]), [entity]);

  entities.entityAddComponent(entity, D);
  t.ok(entity.myD instanceof D, 'added');
  t.deepEqual(entities.queryComponents([C]), [entity]);
  t.deepEqual(entities.queryComponents([C,D]), [entity]);
  t.deepEqual(entities.queryComponents([D,C]), [entity]);

  entities.entityRemoveComponent(entity, D);
  t.deepEqual(entities.queryComponents([C]), [entity]);
  t.deepEqual(entities.queryComponents([C,D]), []);
  t.deepEqual(entities.queryComponents([D]), []);

  entities.entityRemoveComponent(entity, C);
  t.deepEqual(entities.queryComponents([C]), []);

});

