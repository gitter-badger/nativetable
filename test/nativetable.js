/* eslint-env node, mocha */

import chai from 'chai'
import spies from 'chai-spies'
import Nativetable from '../src/scripts/nativetable/nativetable'

describe('Nativetable', () => {
  let table

  before(() => {
    chai.use(spies)
    chai.should()
    global.document = {
      getElementById() {
        return {}
      }
    }

    global.btoa = () => '2U3I3O3I3'

    table = new Nativetable('id')
  })

  beforeEach(() => {
    table.source = [
      {
        id: 12,
        name: 'bob',
        lastname: 'rob',
        age: 81,
        man: true
      },
      {
        id: 20,
        name: 'sarah',
        age: 29,
        man: false,
        brother: 3
      }
    ]
  })

  describe('#constructor', () => {
    before(() => {
      chai.spy.on(Nativetable.prototype, 'draw')
    })

    it('should call draw method on init', () => {
      table = new Nativetable('id')
      table.draw.should.have.been.called()
    })

    it('should init source with empty array when no options is passed', () => {
      table = new Nativetable('id')
      table.source.should.be.an.instanceof(Array)
      table.source.should.be.empty
    })

    it('should init columns with array of keys string when no options is passed', () => {
      table.source.should.be.an.instanceof(Array)
      table.source.should.not.be.empty
    })
  })

  describe('#source', () => {
    it('should not modify values', () => {
      table.source[0].id.should.equal(12)
      table.source[1].name.should.equal('sarah')
      table.source[0].age.should.equal(81)
      table.source[1].man.should.equal(false)
    })
  })

  describe('#filtered', () => {
    it('should be equal to source', () => {
      table.filtered[0].id.should.equal(table.source[0].id)
      table.filtered[1].name.should.equal(table.source[1].name)
      table.filtered[0].age.should.equal(table.source[0].age)
      table.filtered[1].man.should.equal(table.source[1].man)
    })
  })

  describe('#columns', () => {
    it('should have datasource keys as columns name by default', () => {
      table.columns.should.to.eql(['id', 'name', 'lastname', 'age', 'man', 'brother'])
    })

    it('should have datasource keys as columns name when user would force empty array', () => {
      table.columns = []
      table.columns.should.to.eql(['id', 'name', 'lastname', 'age', 'man', 'brother'])
    })

    it('should have the given array elements as columns name', () => {
      table.columns = ['lastname', 'age']
      table.columns.should.to.eql(['lastname', 'age'])
    })

    it('should have the given array elements as columns name only when element is a string', () => {
      table.columns = ['lastname', ['name'], 'age', 2, 'brother']
      table.columns.should.to.eql(['lastname', 'age', 'brother'])
    })
  })

  describe('#objectSignature', () => {
    it('should return an encoded ocject as string', () => {
      table.objectSignature({}).should.be.a('string')
    })
  })
})
