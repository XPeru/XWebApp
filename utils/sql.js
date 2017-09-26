var isId = function (field) {
    return field.name.slice(0, 2) === "id";
};

var isFk = function (field) {
    return field.name.slice(0, 2) === "fk";
};

var buildColumn = function (field) {
    if (isId(field)) {
        return '\n '.concat(field.name).concat(' INT NOT NULL AUTO_INCREMENT,');
    } else if (isFk(field)) {
        return '\n '.concat(field.name).concat(' ').concat('INT') + (field.notNull ? ' NOT NULL,' : ' NULL,');
    } else {
        return '\n '.concat(field.name).concat(' ').concat(field.type) + (field.notNull ? ' NOT NULL,' : ' NULL,');
    }
};

var pk = function (pkName, query) {
    return (pkName ? query.concat('\n '.concat('PRIMARY KEY ( ').concat(pkName).concat(' ),')) : query);
};

var fks = function (fkNames, query) {
    fkNames.forEach(function (fk) {
        var fk_table = fk.substring(3);
        var fk_id = 'id_'.concat(fk_table);
        query = query.concat('\n ')
                    .concat('CONSTRAINT FOREIGN KEY (').concat(fk).concat(')')
                    .concat(' REFERENCES ').concat(fk_table)
                    .concat(' ( ').concat(fk_id).concat(' ),');
    });
    return query;
};

exports.createTableQuery = function (table) {
    var query = '';
    query = query.concat('CREATE TABLE IF NOT EXISTS ').concat(table.table_name).concat('  (');
    var pkName, fkNames = [];
    table.fields.forEach(function (field) {
        if (isId(field)) {
            pkName = field.name;
        } else if (isFk(field)) {
            fkNames.push(field.name);
        }
        query = query.concat(buildColumn(field));
    });
    query = pk(pkName, query);
    query = fks(fkNames, query);
    query = query.slice(0, -1);
    query = query.concat(')');
    return query;
};
