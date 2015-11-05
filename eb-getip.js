#!/usr/bin/env node

var A = require ( 'aws-sdk' );
var EB = new A.ElasticBeanstalk ();
var E = new A.EC2 ();

EB.describeEnvironmentResources ( {
    EnvironmentName: process.argv[2]
}, function ( error, result ) {
    if ( error ) { return console.error ( error ); }

    E.describeInstances ( {
        InstanceIds: result.EnvironmentResources.InstanceIds
    }, function ( error, result ) {
        if ( error ) { return console.error ( error ); }

        console.log ( result );
    } );
} );
