#!/usr/bin/env node

var A = require ( 'aws-sdk' );
var EB = new A.ElasticBeanstalk ( { region: 'eu-west-1' } );
var E = new A.EC2 ( { region: 'eu-west-1' } );

EB.describeEnvironmentResources ( {
    EnvironmentName: process.argv[2]
}, function ( error, result ) {
    if ( error ) { return console.error ( error ); }

    E.describeInstances ( {
        InstanceIds: result.EnvironmentResources.Instances.map ( function ( instance ) {
            return instance.Id;
        } )
    }, function ( error, result ) {
        if ( error ) { return console.error ( error ); }

        console.log ( result.Reservations.map ( function ( r ) {
            return r.Instances[0].PublicIpAddress;
        } )[ process.argv[3] || 0 ] );
    } );
} );
