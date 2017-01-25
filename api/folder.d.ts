////<reference path="./filesystemsync.d.ts" />
///<reference path="./file.d.ts" />

interface Folder {
	/**
	 * References a folder.
	 * The folder does not have to exist.
	 * @param path Absolute path of the folder to reference.
	 * 
	 * #### Example 1: Get a reference to an existing folder
	 * ```
	 * var myFolder = new Folder( 'PROJECT/backend' );
	 * console.log( myFolder.exists );
	 * // true
	 * ```
	 * 
	 * #### Example 2: Get a reference to a missing folder
	 * ```
	 * var myFolder = new Folder( 'PROJECT/missing-folder' );
	 * console.log( myFolder.exists );
	 * // false
	 * ```
	 */
	new(path: String) : Folder;
	/**
	 * Creation date for the folder
	 */
	readonly creationDate: Date;
	/**
	 * `true` if the folder exists at the defined path, `false` otherwise.
	 */
	readonly exists: Boolean;
	/**
	 * Folder extension
	 */
	readonly extension: String;
	/**
	 * Array of Files
	 */
	readonly files: Array<File>;
	// /**
	// *FileSystem of the object
	// */
	// filesystem: FileSystemSync;
	/**
	 * First file found in the folder
	 */
	readonly firstFile: File;
	/**
	 * First folder (i.e., subfolder) in the folder
	 */
	readonly firstFolder: Folder;
	/**
	 * Array of Folder objects
	 */
	folders: Array<Folder>;
	/**
	 * Last modification date for the folder
	 */
	readonly modificationDate: Date;
	/**
	 * Name of the folder without the path
	 */
	readonly name: String;
	/**
	 * Name of the folder without the extension
	 */
	readonly nameNoExt: String;
	/**
	 * Parent folder of the folder
	 */
	readonly parent: Folder;
	/**
	 * Full path of the folder
	 */
	readonly path: String;
	/**
	 * `true` if the folder is visible, `false` otherwise.
	 */
	readonly visible: Boolean;
	/**
	 * Creates a new folder on disk.
	 * @throws An error if something goes wrong: folder already exists, invalid path, ...
	 * @returns `true` if the folder is well created
	 * 
	 * ```
	 * var myFolder = new Folder( 'PROJECT/backend/my-created-folder' );
	 * var myResult = myFolder.create();
	 * console.log( myResult );
	 * // true
	 * ```
	 */
	create() : Boolean;		
	/**
	 * Calls `callback` function for each file at the first level of the folder.
	 * @param callback Defines the function called for each file
	 * @param callback.file Current file being processed
	 * @param thisArg Defines `this` value of the callback
	 * @warning `break` is not working in `forEachFile`
	 * 
	 * #### Example 1: Basic usage
	 * ```
	 * var folder = Folder( 'PROJECT/backend/' );
	 * folder.forEachFile( function( file )
	 * {
	 *     console.log( file.path );
	 * });
	 * ```
	 * 
	 * #### Example 2: Override `this`
	 * ```
	 * var folder = Folder( 'PROJECT/backend/' );
	 * folder.forEachFile( function( file )
	 * {
	 *     console.log( this );
	 * }, {data: 'some-data' } );
	 * // {"data":"some-data"}
	 * ```
	 */
	forEachFile(callback: (file: File)=>void, thisArg?: Object) : void;
	/**
	 * Calls `callback` function for each folder at the first level of the folder.
	 * @param callback Defines the function called for each folder
	 * @param callback.folder Current folder being processed
	 * @param thisArg Defines `this` value of the callback
	 * @warning `break` is not working in `forEachFolder`
	 * 
	 * #### Example 1: Basic usage
	 * ```
	 * var folder = Folder( 'PROJECT/backend/' );
	 * folder.forEachFolder( function( folder )
	 * {
	 *     console.log( folder.path );
	 * });
	 * ```
	 * 
	 * #### Example 2: Override `this`
	 * ```
	 * var folder = Folder( 'PROJECT/backend/' );
	 * folder.forEachFolder( function( folder )
	 * {
	 *     console.log( this );
	 * }, {data: 'some-data' } );
	 * // {"data":"some-data"}
	 * ```
	 */
	forEachFolder(callback: (folder: Folder)=>void, thisArg?: Object) : void;
	/**
	 * Returns the size of the free space (expressed in bytes) available on the volume where the Folder object is stored
	 * @param quotas (default: `true`) `true` if consider the whole volume, `false` if consider only the allowed size for the quota
	 */
	getFreeSpace(quotas?: Boolean) : Number;
	/**
	 * Returns the absolute URL of the Folder object
	 * @param encoding (default: `false`) `true` if encode the url, `false` otherwise.
	 */
	getURL(encoding?: Boolean) : String;
	/**
	 * Returns the total size (expressed in bytes) of the volume where the Folder object is stored
	 */
	getVolumeSize() : Number;
	/**
	 * Check if the path references a folder
	 * @param path Absolute path to a folder
	 * @returns `true` is the path references a folder, `false` otherwise.
	 * 
	 * ```
	 * var myIsFolder = Folder.isFolder( 'PROJECT/backend' );
	 * console.log( myIsFolder );
	 * // true
	 * ```
	 */
	isFolder(path: String) : Boolean;
	// /**
	// *puts the folder pointer on the next subfolder in an iteration of subfolders
	// */
	// next() : Boolean;
	/**
	 * Calls `callback` function for each file in the folder tree (first-level and sub-level folder).
	 * @param callback Defines the function called for each folder
	 * @param thisArg Defines `this` value of the callback
	 * @param callback.file  Current processed file
	 * @param callback.position Position of the file currently being processed
	 * @param callback.folder Folder of the processed file
	 * @warning `break` is not working in `parse`
	 * 
	 * #### Example 1: Basic usage
	 * ```
	 * var folder = Folder( 'PROJECT/backend/' );
	 * folder.parse( function( file, position, folder )
	 * {
	 * 	   console.log( '-----------------------------' );
	 * 	   console.log( file.path );
	 * 	   console.log( position );
	 * 	   console.log( folder.path );
	 * });
	 * ```
	 * 
	 * #### Example 2: Override `this`
	 * ```
	 * var folder = Folder( 'PROJECT/backend/' );
	 * folder.parse( function( file, position, folder )
	 * {
	 *     console.log( this );
	 * }, {data: 'some-data' } );
	 * // {"data":"some-data"}
	 * ```
	 */
	parse(callback: (file: File, position: Number, folder: Folder)=>void, thisArg?: Object) : void;
	/**
	 * Removes the folder and its content from the disk
	 * @returns `true` if the folder is not here, `false` otherwise.
 	 */
	remove() : Boolean;
	/**
	 * Removes the contents of the folder from the disk
	 */
	removeContent() : Boolean;
	/**
	 * Rename the folder on disk
	 * @warning The folder must exist on disk to be renamed
	 * @warning The folder destination must be free
	 * @param name New folder name
	 * @returns `true` if the folder is successfully renamed
	 * @throws An error if something goes wrong: folder already exists, invalid name, ...
	 * 
	 * ````
	 * var myFolder = new Folder( 'PROJECT/backend/my-folder' );
	 * // The folder must exists to be renamed
	 * myFolder.create();
	 * // The destination folder name must be free
	 * myFolder.setName( 'my-renamed-folder' );
	 * // myFolder always references the "my-folder" folder
	 * // The referenced folder did not change with the setName() action.
	 * console.log( myFolder.path );
	 * // PROJECT/backend/my-folder
	 * ```
	 */
	setName(newName: String) : void;
	// /**
	// *checks the validity of the pointer to the current folder within an iteration of folders
	// */
	// valid() : Boolean;
}