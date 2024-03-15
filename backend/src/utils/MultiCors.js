import cors from 'cors';

export default function(corsAllowlist = ['http://localhost:4000']) {
    const corsOptionsDelegate = function (req, callback) {
        let corsOptions = {
            credentials: true,
            origin: null
        };

        corsOptions.origin = corsAllowlist.indexOf(req.header('Origin')) !== -1;
        
        callback(null, corsOptions)
    }
    
    return cors(corsOptionsDelegate);
}